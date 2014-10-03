package com.enonic.wem.modules.xeon;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.enonic.wem.api.content.Content;
import com.enonic.wem.api.content.ContentConstants;
import com.enonic.wem.api.content.ContentPath;
import com.enonic.wem.api.content.ContentService;
import com.enonic.wem.api.content.page.CreatePageTemplateParams;
import com.enonic.wem.api.content.page.PageDescriptorKey;
import com.enonic.wem.api.content.page.PageRegions;
import com.enonic.wem.api.content.page.PageTemplateService;
import com.enonic.wem.api.content.page.image.ImageComponent;
import com.enonic.wem.api.content.page.layout.LayoutComponent;
import com.enonic.wem.api.content.page.layout.LayoutDescriptorKey;
import com.enonic.wem.api.content.page.layout.LayoutRegions;
import com.enonic.wem.api.content.page.part.PartComponent;
import com.enonic.wem.api.content.page.region.Region;
import com.enonic.wem.api.content.page.part.PartDescriptorKey;
import com.enonic.wem.api.content.site.CreateSiteParams;
import com.enonic.wem.api.content.site.ModuleConfig;
import com.enonic.wem.api.content.site.ModuleConfigs;
import com.enonic.wem.api.context.Context;
import com.enonic.wem.api.data.RootDataSet;
import com.enonic.wem.api.initializer.DataInitializer;
import com.enonic.wem.api.module.ModuleKey;
import com.enonic.wem.api.schema.content.ContentTypeName;
import com.enonic.wem.api.schema.content.ContentTypeNames;
import com.enonic.wem.api.schema.content.ContentTypeService;

@SuppressWarnings("UnusedDeclaration")
public final class Initializer
    implements DataInitializer
{
    private final static Logger LOG = LoggerFactory.getLogger( Initializer.class );

    private static final Context STAGE_CONTEXT = ContentConstants.CONTEXT_STAGE;

    public static final ModuleKey THIS_MODULE = ModuleKey.from( Initializer.class );

    private ContentPath xeonFolder = ContentPath.from( "/xeon" );

    private ContentService contentService;

    private PageTemplateService pageTemplateService;

    private ContentTypeService contentTypeService;

    private Context context = STAGE_CONTEXT;

    @Override
    public void initialize()
        throws Exception
    {
        LOG.info( "initialize...." );

        if ( !this.hasContent( xeonFolder ) )
        {
            final ModuleConfig moduleConfig = ModuleConfig.newModuleConfig().
                module( THIS_MODULE ).
                config( new RootDataSet() ).
                build();
            final ModuleConfigs moduleConfigs = ModuleConfigs.from( moduleConfig );

            final Content site = contentService.create( createSiteContent( "Xeon", "Xeon demo site.", moduleConfigs ), context );

            createPageTemplateHomePage( site.getPath() );
            createPageTemplateBannerPage( site.getPath() );
            createPageTemplatePresonPage( site.getPath() );
        }
    }

    private CreateSiteParams createSiteContent( final String displayName, final String description, final ModuleConfigs moduleConfigs )
    {
        return new CreateSiteParams().
            moduleConfigs( moduleConfigs ).
            description( description ).
            displayName( displayName ).
            parent( ContentPath.ROOT );
    }

    private Content createPageTemplateHomePage( final ContentPath sitePath )
    {
        final ContentTypeNames supports = ContentTypeNames.from( ContentTypeName.site() );

        return pageTemplateService.create( new CreatePageTemplateParams().
            site( sitePath ).
            name( "home-page" ).
            displayName( "Home page" ).
            controller( PageDescriptorKey.from( "com.enonic.wem.modules.xeon:apage" ) ).
            supports( supports ).
            pageConfig( new RootDataSet() ).
            pageRegions( PageRegions.newPageRegions().
                add( Region.newRegion().
                    name( "main" ).
                    add( PartComponent.newPartComponent().name( "Empty-part" ).build() ).
                    build() ).
                build() ), context );
    }

    private Content createPageTemplateBannerPage( final ContentPath sitePath )
    {
        final ContentTypeNames supports = ContentTypeNames.from( ContentTypeName.site() );

        return pageTemplateService.create( new CreatePageTemplateParams().
            site( sitePath ).
            name( "banner-page" ).
            displayName( "Banner" ).
            controller( PageDescriptorKey.from( "com.enonic.wem.modules.xeon:banner-page" ) ).
            supports( supports ).
            pageConfig( new RootDataSet() ).
            pageRegions( PageRegions.newPageRegions().
                add( Region.newRegion().
                    name( "main" ).
                    add( LayoutComponent.newLayoutComponent().name( "Layout-3-col" ).
                        descriptor( LayoutDescriptorKey.from( "com.enonic.wem.modules.xeon:layout-3-col" ) ).
                        regions( LayoutRegions.newLayoutRegions().
                            add( Region.newRegion().name( "left" ).
                                add( ImageComponent.newImageComponent().name( "Image" ).build() ).
                                build() ).
                            add( Region.newRegion().name( "center" ).
                                add( ImageComponent.newImageComponent().name( "Image" ).build() ).
                                build() ).
                            add( Region.newRegion().name( "right" ).
                                add( ImageComponent.newImageComponent().name( "Image" ).build() ).
                                build() ).
                            build() ).
                        build() ).
                    add( PartComponent.newPartComponent().name( "mypart" ).build() ).
                    build() ).
                build() ), context );
    }

    private Content createPageTemplatePresonPage( final ContentPath sitePath )
    {
        final ContentTypeNames supports = ContentTypeNames.from( ContentTypeName.from( "com.enonic.wem.modules.xeon:person" ) );

        return pageTemplateService.create( new CreatePageTemplateParams().
            site( sitePath ).
            name( "person-page" ).
            displayName( "Person" ).
            controller( PageDescriptorKey.from( "com.enonic.wem.modules.xeon:person" ) ).
            supports( supports ).
            pageConfig( new RootDataSet() ).
            pageRegions( PageRegions.newPageRegions().
                add( Region.newRegion().
                    name( "main" ).
                    add( PartComponent.newPartComponent().name( "Person" ).descriptor(
                        PartDescriptorKey.from( "com.enonic.wem.modules.xeon:person" ) ).build() ).
                    build() ).
                build() ), context );
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
