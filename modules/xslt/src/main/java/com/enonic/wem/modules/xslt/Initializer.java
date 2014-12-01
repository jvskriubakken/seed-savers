package com.enonic.wem.modules.xslt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.enonic.wem.api.content.Content;
import com.enonic.wem.api.content.ContentPath;
import com.enonic.wem.api.content.ContentService;
import com.enonic.wem.api.content.page.CreatePageTemplateParams;
import com.enonic.wem.api.content.page.PageDescriptorKey;
import com.enonic.wem.api.content.page.PageRegions;
import com.enonic.wem.api.content.page.PageTemplateService;
import com.enonic.wem.api.content.page.part.PartComponent;
import com.enonic.wem.api.content.page.region.Region;
import com.enonic.wem.api.content.site.CreateSiteParams;
import com.enonic.wem.api.content.site.ModuleConfig;
import com.enonic.wem.api.content.site.ModuleConfigs;
import com.enonic.wem.api.content.site.Site;
import com.enonic.wem.api.data2.PropertyTree;
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

    public static final ModuleKey THIS_MODULE = ModuleKey.from( Initializer.class );

    private ContentPath xsltSitePath = ContentPath.from( "/xslt" );

    private ContentService contentService;

    private PageTemplateService pageTemplateService;

    private ContentTypeService contentTypeService;


    @Override
    public void initialize()
        throws Exception
    {
        LOG.info( "initialize...." );

        if ( !this.hasContent( xsltSitePath ) )
        {
            final ModuleConfig moduleConfig = ModuleConfig.newModuleConfig().
                module( THIS_MODULE ).
                config( new PropertyTree() ).
                build();
            final ModuleConfigs moduleConfigs = ModuleConfigs.from( moduleConfig );

            final Site site = contentService.create( createSiteContent( "Xslt", "Xslt demo site.", moduleConfigs ) );

            createPageTemplateHomePage( site.getPath() );
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
            name( "xslt-landing-page" ).
            displayName( "XSLT Landing page" ).
            controller( PageDescriptorKey.from( THIS_MODULE, "xslt-landing-page" ) ).
            supports( supports ).
            pageConfig( new PropertyTree() ).
            pageRegions( PageRegions.newPageRegions().
                add( Region.newRegion().
                    name( "main" ).
                    add( PartComponent.newPartComponent().name( "Empty-part" ).build() ).
                    build() ).
                build() ) );
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
