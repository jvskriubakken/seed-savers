package com.enonic.wem.sample.demo;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.io.ByteSource;
import com.google.common.io.Resources;

import com.enonic.wem.api.blob.Blob;
import com.enonic.wem.api.blob.BlobService;
import com.enonic.wem.api.content.Content;
import com.enonic.wem.api.content.ContentPath;
import com.enonic.wem.api.content.ContentService;
import com.enonic.wem.api.content.CreateContentParams;
import com.enonic.wem.api.content.attachment.Attachment;
import com.enonic.wem.api.content.data.ContentData;
import com.enonic.wem.api.data.Property;
import com.enonic.wem.api.form.Form;
import com.enonic.wem.api.form.Input;
import com.enonic.wem.api.form.inputtype.InputTypes;
import com.enonic.wem.api.initializer.DataInitializer;
import com.enonic.wem.api.schema.content.ContentType;
import com.enonic.wem.api.schema.content.ContentTypeName;
import com.enonic.wem.api.schema.content.ContentTypeNames;
import com.enonic.wem.api.schema.content.ContentTypeService;
import com.enonic.wem.api.schema.content.GetContentTypesParams;
import com.enonic.wem.api.security.CreateGroupParams;
import com.enonic.wem.api.security.CreateRoleParams;
import com.enonic.wem.api.security.CreateUserParams;
import com.enonic.wem.api.security.PrincipalKey;
import com.enonic.wem.api.security.PrincipalRelationship;
import com.enonic.wem.api.security.SecurityService;
import com.enonic.wem.api.security.UserStoreKey;

import static com.enonic.wem.api.content.attachment.Attachment.newAttachment;

public final class DemoInitializer
    implements DataInitializer
{
    private final static Logger LOG = LoggerFactory.getLogger( DemoInitializer.class );

    private static final String[] FOLDER_IMAGES_POP =
        {"Pop_01.jpg", "Pop_02.jpg", "Pop_03.jpg", "Pop_04.jpg", "Pop_05.jpg", "Pop_06.jpg", "Pop_07.jpg", "Pop_08.jpg", "Pop-Black.jpg",
            "Pop-Green.jpg", "Pop-Silverpink.jpg"};

    private static final String[] FOLDER_IMAGES_BIG =
        {"Big Bounce - R\u00f8d Tattoo.jpg", "Big Bounce - R\u00f8d.jpg", "Big Bounce_01.jpg", "Big Bounce_02.jpg", "Big Bounce_03.jpg",
            "Big Bounce_04.jpg", "Big Bounce_05.jpg", "Big Bounce_06.jpg", "Big Bounce_07.jpg", "Big Bounce_08.jpg", "Big Bounce_10.jpg",
            "Big Bounce_11.jpg", "Big Bounce_12.jpg"};

    private static final Form MEDIA_IMAGE_FORM = createMediaImageForm();

    private static final String IMAGE_ARCHIVE_PATH_ELEMENT = "imagearchive";

    private BlobService blobService;

    private ContentService contentService;

    private ContentTypeService contentTypeService;

    private SecurityService securityService;

    @Override
    public void initialize()
        throws Exception
    {
        createImages();
        createLargeTree();
        createPrincipals();
    }

    private boolean hasContent( final ContentPath path )
    {
        try
        {
            return this.contentService.getByPath( path ) != null;
        }
        catch ( final Exception e )
        {
            return false;
        }
    }

    private void createLargeTree()
    {
        final ContentPath largeTreePath = ContentPath.from( "large-tree" );
        if ( !hasContent( largeTreePath ) )
        {
            contentService.create( createFolder().
                name( "large-tree" ).
                displayName( "Large tree" ).
                parent( ContentPath.ROOT ) );

            for ( int i = 1; i <= 2; i++ )
            {
                Content parent = contentService.create( createFolder().
                    displayName( "large-tree-node-" + i ).
                    displayName( "Large tree node " + i ).
                    parent( largeTreePath ) );

                for ( int j = 1; j <= 100; j++ )
                {
                    contentService.create( createFolder().
                        displayName( "large-tree-node-" + i + "-" + j ).
                        displayName( "Large tree node " + i + "-" + j ).
                        parent( parent.getPath() ) );
                }
            }
        }
    }

    private void createImages()
        throws Exception
    {
        final ContentPath imageArchivePath = ContentPath.from( ContentPath.ROOT, IMAGE_ARCHIVE_PATH_ELEMENT );
        if ( hasContent( imageArchivePath ) )
        {
            LOG.info( "Already initialized with data. Skipping." );
            return;
        }

        LOG.info( "Initializing demo content..." );
        final long tm = System.currentTimeMillis();

        try
        {
            doCreateImages();
        }
        finally
        {
            LOG.info( "Initialized demo content in " + ( System.currentTimeMillis() - tm ) + " ms" );
        }

    }

    private void doCreateImages()
        throws Exception
    {

        final ContentPath imageArchivePath = contentService.create( createFolder().
            parent( ContentPath.ROOT ).
            displayName( "Image Archive" ) ).getPath();

        contentService.create( createFolder().
            parent( imageArchivePath ).
            displayName( "Misc" ) );

        contentService.create( createFolder().
            parent( imageArchivePath ).
            displayName( "People" ) );

        ContentPath trampolinerPath = contentService.create( createFolder().
            parent( imageArchivePath ).
            displayName( "Trampoliner" ) ).getPath();

        final ContentPath folderImagesBig = contentService.create( createFolder().
            parent( trampolinerPath ).
            displayName( "Jumping Jack - Big Bounce" ) ).getPath();

        final ContentPath folderImagesPop = contentService.create( createFolder().
            parent( trampolinerPath ).
            displayName( "Jumping Jack - Pop" ).
            contentType( ContentTypeName.folder() ) ).getPath();

        for ( final String fileName : FOLDER_IMAGES_BIG )
        {
            createImageContent( folderImagesBig, fileName, StringUtils.substringBefore( fileName, "." ) );
        }

        for ( final String fileName : FOLDER_IMAGES_POP )
        {
            createImageContent( folderImagesPop, fileName, StringUtils.substringBefore( fileName, "." ) );
        }
    }

    private void createImageContent( final ContentPath parent, final String fileName, final String displayName )
        throws Exception
    {
        // TODO: fix due to Intellij failing when building jar with ø in resource file
        final String fixedFileName = fileName.replace( "\u00f8", "_o_" );
        final byte[] bytes = loadImageFileAsBytes( fixedFileName );
        if ( bytes == null )
        {
            return;
        }

        // FIXME: hack to avoid exception from NodeName preconditions
        final String filteredFileName =
            fileName.replace( " ", "_" ).replace( "ø", "o" ).replace( "æ", "ae" ).replace( "å", "aa" ).toLowerCase();

        final ContentData dataSet = createContentData( filteredFileName );

        final Blob blob = blobService.create( ByteSource.wrap( bytes ).openStream() );
        final Attachment attachment = newAttachment().name( filteredFileName ).blobKey( blob.getKey() ).mimeType( "image/jpeg" ).build();

        final CreateContentParams params = new CreateContentParams().
            contentType( ContentTypeName.imageMedia() ).
            form( MEDIA_IMAGE_FORM ).
            displayName( displayName ).
            parent( parent ).
            contentData( dataSet ).
            attachments( attachment );
        contentService.create( params ).getId();
    }

    private ContentData createContentData( final String attachmentName )
    {
        final ContentData dataSet = new ContentData();
        dataSet.add( Property.newString( "mimeType", "image/png" ) );
        dataSet.add( Property.newString( "image", attachmentName ) );
        return dataSet;
    }

    private byte[] loadImageFileAsBytes( final String fileName )
    {
        final String filePath = "/images/" + fileName;

        try
        {
            return Resources.toByteArray( getClass().getResource( filePath ) );
        }
        catch ( Exception e )
        {
            return null;
        }
    }

    private CreateContentParams createFolder()
    {
        return new CreateContentParams().
            owner( PrincipalKey.ofAnonymous() ).
            contentData( new ContentData() ).
            form( getContentType( ContentTypeName.folder() ).form() ).
            contentType( ContentTypeName.folder() );
    }

    private ContentType getContentType( ContentTypeName name )
    {
        final GetContentTypesParams params = new GetContentTypesParams().contentTypeNames( ContentTypeNames.from( name ) );
        return contentTypeService.getByNames( params ).first();
    }

    private void createPrincipals()
    {
        final CreateUserParams user1 = CreateUserParams.create().
            userKey( PrincipalKey.ofUser( UserStoreKey.system(), "tsi" ) ).
            displayName( "Thomas Sigdestad" ).
            login( "tsi" ).
            password( "password" ).
            build();
        addUser( user1 );

        final CreateUserParams user2 = CreateUserParams.create().
            userKey( PrincipalKey.ofUser( UserStoreKey.system(), "mer" ) ).
            displayName( "Morten Eriksen" ).
            login( "mer" ).
            password( "password" ).
            build();
        addUser( user2 );

        final CreateUserParams createAdmin = CreateUserParams.create().
            userKey( PrincipalKey.ofUser( UserStoreKey.system(), "admin" ) ).
            displayName( "Administrator" ).
            login( "admin" ).
            password( "password" ).
            build();
        addUser( createAdmin );

        final CreateGroupParams createGroup1 = CreateGroupParams.create().
            groupKey( PrincipalKey.ofGroup( UserStoreKey.system(), "developers" ) ).
            displayName( "Developers" ).
            build();
        addGroup( createGroup1 );

        final CreateGroupParams createGroup2 = CreateGroupParams.create().
            groupKey( PrincipalKey.ofGroup( UserStoreKey.system(), "consultants" ) ).
            displayName( "Consultants" ).
            build();
        addGroup( createGroup2 );

        final CreateRoleParams createRole1 = CreateRoleParams.create().
            roleKey( PrincipalKey.ofRole( "superuser" ) ).
            displayName( "Superuser" ).
            build();
        addRole( createRole1 );

        addMember( createGroup1.getKey(), user1.getKey() );
        addMember( createGroup1.getKey(), user1.getKey() );
        addMember( createGroup1.getKey(), user2.getKey() );
        addMember( createRole1.getKey(), user2.getKey() );
    }

    private void addMember( final PrincipalKey parent, final PrincipalKey member )
    {
        try
        {
            final PrincipalRelationship relationship = PrincipalRelationship.from( parent ).to( member );
            securityService.addRelationship( relationship );
            LOG.info( "Principal " + member + " added as member of " + parent );
        }
        catch ( Throwable t )
        {
            LOG.error( "Unable to add principal " + member + " as member of " + parent );
        }
    }

    private void addUser( final CreateUserParams createUser )
    {
        try
        {
            if ( !securityService.getUser( createUser.getKey() ).isPresent() )
            {
                securityService.createUser( createUser );
                LOG.info( "User created: " + createUser.getKey().toString() );
            }
        }
        catch ( Throwable t )
        {
            LOG.error( "Unable to initialize user: " + createUser.getKey().toString(), t );
        }
    }

    private void addGroup( final CreateGroupParams createGroup )
    {
        try
        {
            if ( !securityService.getGroup( createGroup.getKey() ).isPresent() )
            {
                securityService.createGroup( createGroup );
                LOG.info( "Group created: " + createGroup.getKey().toString() );
            }
        }
        catch ( Throwable t )
        {
            LOG.error( "Unable to initialize group: " + createGroup.getKey().toString(), t );
        }
    }

    private void addRole( final CreateRoleParams createRole )
    {
        try
        {
            if ( !securityService.getRole( createRole.getKey() ).isPresent() )
            {
                securityService.createRole( createRole );
                LOG.info( "Role created: " + createRole.getKey().toString() );
            }
        }
        catch ( Throwable t )
        {
            LOG.error( "Unable to initialize role: " + createRole.getKey().toString(), t );
        }
    }

    private static Form createMediaImageForm()

    {
        return Form.newForm().
            addFormItem( Input.newInput().name( "image" ).
                inputType( InputTypes.IMAGE ).build() ).
            addFormItem( Input.newInput().name( "mimeType" ).
                inputType( InputTypes.TEXT_LINE ).
                label( "Mime type" ).
                occurrences( 1, 1 ).
                build() ).

            build();
    }

    public void setBlobService( final BlobService blobService )
    {
        this.blobService = blobService;
    }

    public void setContentService( final ContentService contentService )
    {
        this.contentService = contentService;
    }

    public void setContentTypeService( final ContentTypeService contentTypeService )
    {
        this.contentTypeService = contentTypeService;
    }

    public void setSecurityService( final SecurityService securityService )
    {
        this.securityService = securityService;
    }

}
