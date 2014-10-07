package org.seedsavers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.enonic.wem.api.account.AccountKey;
import com.enonic.wem.api.content.Content;
import com.enonic.wem.api.content.ContentPath;
import com.enonic.wem.api.content.ContentService;
import com.enonic.wem.api.content.CreateContentParams;
import com.enonic.wem.api.content.data.ContentData;
import com.enonic.wem.api.content.page.CreatePageTemplateParams;
import com.enonic.wem.api.content.page.PageDescriptorKey;
import com.enonic.wem.api.content.page.PageRegions;
import com.enonic.wem.api.content.page.PageTemplateService;
import com.enonic.wem.api.content.page.image.ImageComponent;
import com.enonic.wem.api.content.page.part.PartComponent;
import com.enonic.wem.api.content.page.part.PartDescriptorKey;
import com.enonic.wem.api.content.page.region.Region;
import com.enonic.wem.api.content.site.CreateSiteParams;
import com.enonic.wem.api.content.site.ModuleConfig;
import com.enonic.wem.api.content.site.ModuleConfigs;
import com.enonic.wem.api.content.site.Site;
import com.enonic.wem.api.data.RootDataSet;
import com.enonic.wem.api.data.Value;
import com.enonic.wem.api.form.Form;
import com.enonic.wem.api.initializer.DataInitializer;
import com.enonic.wem.api.module.ModuleKey;
import com.enonic.wem.api.schema.content.ContentType;
import com.enonic.wem.api.schema.content.ContentTypeName;
import com.enonic.wem.api.schema.content.ContentTypeNames;
import com.enonic.wem.api.schema.content.ContentTypeService;
import com.enonic.wem.api.schema.content.GetContentTypesParams;

@SuppressWarnings("UnusedDeclaration")
public final class Initializer
    implements DataInitializer
{
    private final static Logger LOG = LoggerFactory.getLogger( Initializer.class );

    public static final ModuleKey THIS_MODULE = ModuleKey.from( Initializer.class );

    private static final ContentTypeName MEMBER_CONTENT_TYPE_NAME = ContentTypeName.from( THIS_MODULE, "member" );

    private ContentPath seedSaversFolder = ContentPath.from( "/seed-savers" );

    private ContentPath membersFolder = ContentPath.from( seedSaversFolder, "members" );

    private ContentService contentService;

    private PageTemplateService pageTemplateService;

    private ContentTypeService contentTypeService;

    @Override
    public void initialize()
        throws Exception
    {
        LOG.info( "initialize...." );

        if ( !this.hasContent( ContentPath.from( "/seed-savers" ) ) )
        {
            final ModuleConfig moduleConfig = ModuleConfig.newModuleConfig().
                module( THIS_MODULE ).
                config( new RootDataSet() ).
                build();
            final ModuleConfigs moduleConfigs = ModuleConfigs.from( moduleConfig );

            final Site site = contentService.create( createSiteContent( "Seed Savers", "A Site for seed savers.", moduleConfigs ) );

            createPageTemplateTopMain( site.getPath() );
            createPageTemplatePlant( site.getPath() );
            createPageTemplateMember( site.getPath() );
            createPageTemplateFamily( site.getPath() );

            contentService.create( createFolder().
                parent( seedSaversFolder ).
                displayName( "Members" ) );

            final Content families = contentService.create( createFolder().
                parent( seedSaversFolder ).
                displayName( "Families" ) );

            createFamilies( families.getPath() );

            contentService.create( createFolder().
                parent( seedSaversFolder ).
                displayName( "Genus" ) );

            contentService.create( createFolder().
                parent( seedSaversFolder ).
                displayName( "Varieties" ) );

            contentService.create( createFolder().
                parent( seedSaversFolder ).
                displayName( "Caretakings" ) );

            createMembers();
        }
    }

    private void createMembers()
    {
        contentService.create( createMember( "Åse Kålrot" ) );
        contentService.create( createMember( "Guri Gulrot" ) );
        contentService.create( createMember( "Johan Støver" ) );
        contentService.create( createMember( "Jørund Vier Skriubakken" ) );
        contentService.create( createMember( "Kari Korn" ) );
        contentService.create( createMember( "Per Kål" ) );
        contentService.create( createMember( "Petter Skvaller" ) );
    }

    private CreateSiteParams createSiteContent( final String displayName, final String description, final ModuleConfigs moduleConfigs )
    {
        return new CreateSiteParams().
            moduleConfigs( moduleConfigs ).
            description( description ).
            displayName( displayName ).
            parent( ContentPath.ROOT );
    }

    private CreateContentParams createFolder()
    {
        return new CreateContentParams().
            owner( AccountKey.anonymous() ).
            contentData( new ContentData() ).
            form( getContentType( ContentTypeName.folder() ).form() ).
            contentType( ContentTypeName.folder() );
    }

    private CreateContentParams createMember( final String displayName )
    {
        final Form memberForm = this.getContentType( MEMBER_CONTENT_TYPE_NAME ).form();
        final ContentTypeName contentType = MEMBER_CONTENT_TYPE_NAME;
        final ContentData data = new ContentData();
        data.setProperty( "name", Value.newString( displayName ) );
        return new CreateContentParams().
            displayName( displayName ).
            owner( AccountKey.anonymous() ).
            contentData( data ).
            form( memberForm ).
            contentType( contentType ).
            parent( this.membersFolder );
    }

    private void createFamilies( final ContentPath parentPath )
    {
        contentService.create( createFamily( "Plantaginaceae", "Kjempefamilien" ).
            parent( parentPath ) );
        contentService.create( createFamily( "Verbenaceae", "Jernurtfamilien" ).
            parent( parentPath ) );
        contentService.create( createFamily( "Lamiaceae", "Leppeblomstfamilien" ).
            parent( parentPath ) );
    }

    private CreateContentParams createFamily( final String scientificName, final String norwegianName )
    {
        final ContentData data = new ContentData();
        data.addProperty( "norwegianNames", Value.newString( norwegianName ) );

        return new CreateContentParams().
            displayName( scientificName ).
            owner( AccountKey.anonymous() ).
            contentData( data ).
            contentType( ContentTypeName.from( "com.enonic.wem.modules.seedsavers:family" ) );
    }

    private Content createPageTemplateTopMain( final ContentPath sitePath )
    {
        final ContentTypeNames supports = ContentTypeNames.from( ContentTypeName.site() );
        return pageTemplateService.create( new CreatePageTemplateParams().
            site( sitePath ).
            name( "top-main" ).
            displayName( "Top and main" ).
            controller( PageDescriptorKey.from( THIS_MODULE, "top-main" ) ).
            supports( supports ).
            pageConfig( new RootDataSet() ).
            pageRegions( PageRegions.newPageRegions().
                add( Region.newRegion().
                    name( "top" ).
                    add( ImageComponent.newImageComponent().name( "Image" ).build() ).
                    build() ).
                add( Region.newRegion().name( "main" ).build() ).
                build() ) );
    }

    private Content createPageTemplateFamily( final ContentPath sitePath )
    {
        final ContentTypeNames supports = ContentTypeNames.from( ContentTypeName.from( THIS_MODULE, "family" ) );
        return pageTemplateService.create( new CreatePageTemplateParams().
            site( sitePath ).
            name( "family" ).
            displayName( "Family" ).
            controller( PageDescriptorKey.from( THIS_MODULE, "family" ) ).
            supports( supports ).
            pageRegions( PageRegions.newPageRegions().
                add( Region.newRegion().
                    name( "main" ).
                    add( ImageComponent.newImageComponent().name( "Image" ).build() ).
                    add( PartComponent.newPartComponent().
                        name( "Family" ).descriptor( PartDescriptorKey.from( THIS_MODULE, "family" ) ).
                        build() ).
                    build() ).
                build() ).
            pageConfig( new RootDataSet() ) );
    }

    private Content createPageTemplatePlant( final ContentPath sitePath )
    {
        final ContentTypeNames supports = ContentTypeNames.from( ContentTypeName.from( THIS_MODULE, "plant" ) );
        return pageTemplateService.create( new CreatePageTemplateParams().
            site( sitePath ).
            name( "plant" ).
            displayName( "Plant" ).
            controller( PageDescriptorKey.from( THIS_MODULE, "plant" ) ).
            supports( supports ).
            pageRegions( PageRegions.newPageRegions().
                add( Region.newRegion().
                    name( "main" ).
                    add( ImageComponent.newImageComponent().name( "Image" ).build() ).
                    add( PartComponent.newPartComponent().
                        name( "Plant" ).descriptor( PartDescriptorKey.from( THIS_MODULE, "plant" ) ).
                        build() ).
                    build() ).
                build() ).
            pageConfig( new RootDataSet() ) );
    }

    private Content createPageTemplateMember( final ContentPath sitePath )
    {
        final ContentTypeNames supports = ContentTypeNames.from( ContentTypeName.from( THIS_MODULE, "member" ) );
        return pageTemplateService.create( new CreatePageTemplateParams().
            site( sitePath ).
            name( "member" ).
            displayName( "Member" ).
            controller( PageDescriptorKey.from( THIS_MODULE, "member" ) ).
            supports( supports ).
            pageRegions( PageRegions.newPageRegions().
                add( Region.newRegion().
                    name( "main" ).
                    add( PartComponent.newPartComponent().
                        name( "Member" ).descriptor( PartDescriptorKey.from( THIS_MODULE, "member" ) ).
                        build() ).
                    build() ).
                build() ).
            pageConfig( new RootDataSet() ) );
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
            return this.contentService.getByPath( path ) != null;
        }
        catch ( final Exception e )
        {
            return false;
        }
    }

    public void setContentService( final ContentService contentService )
    {
        this.contentService = contentService;
    }

    public void setPageTemplateService( final PageTemplateService pageTemplateService )
    {
        this.pageTemplateService = pageTemplateService;
    }

    public void setContentTypeService( final ContentTypeService contentTypeService )
    {
        this.contentTypeService = contentTypeService;
    }
}
