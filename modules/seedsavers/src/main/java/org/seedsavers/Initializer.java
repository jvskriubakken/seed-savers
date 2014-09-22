package org.seedsavers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.enonic.wem.api.account.AccountKey;
import com.enonic.wem.api.blob.BlobService;
import com.enonic.wem.api.content.Content;
import com.enonic.wem.api.content.ContentConstants;
import com.enonic.wem.api.content.ContentPath;
import com.enonic.wem.api.content.ContentService;
import com.enonic.wem.api.content.CreateContentParams;
import com.enonic.wem.api.content.data.ContentData;
import com.enonic.wem.api.context.Context;
import com.enonic.wem.api.data.Value;
import com.enonic.wem.api.form.Form;
import com.enonic.wem.api.module.ModuleKey;
import com.enonic.wem.api.schema.content.ContentType;
import com.enonic.wem.api.schema.content.ContentTypeName;
import com.enonic.wem.api.schema.content.ContentTypeNames;
import com.enonic.wem.api.schema.content.ContentTypeService;
import com.enonic.wem.api.schema.content.GetContentTypesParams;

@SuppressWarnings("UnusedDeclaration")
public class Initializer
{
    private final static Logger LOG = LoggerFactory.getLogger( Initializer.class );

    private static final Context STAGE_CONTEXT = ContentConstants.CONTEXT_STAGE;

    private static final ContentTypeName MEMBER_CONTENT_TYPE_NAME =
        ContentTypeName.from( ModuleKey.from( "com.enonic.wem.modules.seedsavers-1.0.0" ), "member" );

    private ContentPath seedSaversFolder = ContentPath.from( "/seed-savers" );

    private ContentPath membersFolder = ContentPath.from( seedSaversFolder, "members" );

    private BlobService blobService;

    private ContentService contentService;

    private ContentTypeService contentTypeService;

    private Context context = STAGE_CONTEXT;

    public void initialize()
        throws Exception
    {
        LOG.info( "initialize...." );

        if ( !this.hasContent( ContentPath.from( "/seed-savers" ) ) )
        {
            contentService.create( createFolder().
                name( "seed-savers" ).
                parent( ContentPath.ROOT ).
                displayName( "Seed Savers" ), context );

            contentService.create( createFolder().
                name( "members" ).
                parent( seedSaversFolder ).
                displayName( "Members" ), context );

            contentService.create( createFolder().
                name( "families" ).
                parent( seedSaversFolder ).
                displayName( "Families" ), context );

             contentService.create( createFolder().
                name( "genus" ).
                parent( seedSaversFolder ).
                displayName( "Genus" ), context );

            contentService.create( createFolder().
                name( "varieties" ).
                parent( seedSaversFolder ).
                displayName( "Varieties" ), context );

            contentService.create( createFolder().
                name( "caretakings" ).
                parent( seedSaversFolder ).
                displayName( "Caretakings" ), context );
        }

        Thread t = new Thread( new Runnable()
        {
            @Override
            public void run()
            {
                while ( !contentTypeInstalled( MEMBER_CONTENT_TYPE_NAME ) )
                {
                    try
                    {
                        Thread.sleep( 1000 );
                    }
                    catch ( InterruptedException e )
                    {
                        // Ignore
                    }
                }
                createMembers();
            }
        } );
        t.start();

    }

    private void createMembers()
    {
        contentService.create( createMember( "aase-kaalrot", "Åse Kålrot" ), context );
        contentService.create( createMember( "guri-gulrot", "Guri Gulrot" ), context );
        contentService.create( createMember( "johan-stover", "Johan Støver" ), context );
        contentService.create( createMember( "joerund-vier-skriubakken", "Jørund Vier Skriubakken" ), context );
        contentService.create( createMember( "kari-korn", "Kari Korn" ), context );
        contentService.create( createMember( "per-kaal", "Per Kål" ), context );
        contentService.create( createMember( "petter-skvaller", "Petter Skvaller" ), context );
    }

    private CreateContentParams createFolder()
    {
        return new CreateContentParams().
            owner( AccountKey.anonymous() ).
            contentData( new ContentData() ).
            form( getContentType( ContentTypeName.folder() ).form() ).
            contentType( ContentTypeName.folder() );
    }

    private CreateContentParams createMember( final String name, final String displayName )
    {
        final Form memberForm = this.getContentType( MEMBER_CONTENT_TYPE_NAME ).form();
        final ContentTypeName contentType = MEMBER_CONTENT_TYPE_NAME;
        final ContentData data = new ContentData();
        data.setProperty( "name", Value.newString( name ) );
        return new CreateContentParams().
            name( name ).
            displayName( displayName ).
            owner( AccountKey.anonymous() ).
            contentData( data ).
            form( memberForm ).
            contentType( contentType ).
            parent( this.membersFolder );
    }

    private boolean contentTypeInstalled( ContentTypeName name )
    {
        return getContentType( name ) != null;
    }

    private ContentType getContentType( ContentTypeName name )
    {
        final GetContentTypesParams params = new GetContentTypesParams().contentTypeNames( ContentTypeNames.from( name ) );
        return contentTypeService.getByNames( params ).first();
    }

    private boolean hasContent( final ContentPath path )
    {
        try
        {
            return this.contentService.getByPath( path, STAGE_CONTEXT ) != null;
        }
        catch ( final Exception e )
        {
            return false;
        }
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
}
