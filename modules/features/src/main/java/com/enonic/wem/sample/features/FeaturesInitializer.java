package com.enonic.wem.sample.features;

import org.osgi.framework.Bundle;
import org.osgi.framework.FrameworkUtil;

import com.enonic.wem.api.content.Content;
import com.enonic.wem.api.content.ContentPath;
import com.enonic.wem.api.content.ContentService;
import com.enonic.wem.api.content.CreateContentParams;
import com.enonic.wem.api.data.PropertyTree;
import com.enonic.wem.api.initializer.DataInitializer;
import com.enonic.wem.api.schema.content.ContentTypeName;
import com.enonic.wem.api.schema.content.ContentTypeService;
import com.enonic.wem.api.security.PrincipalKey;

public final class FeaturesInitializer
    implements DataInitializer
{
    private Content featuresFolder;

    private ContentService contentService;

    private ContentTypeService contentTypeService;


    @Override
    public void initialize()
        throws Exception
    {
        if ( hasContent( ContentPath.from( "/features" ) ) )
        {
            return;
        }

        featuresFolder = contentService.create( makeFolder().displayName( "Features" ).parent( ContentPath.ROOT ) );
        contentService.create( makeFolder().displayName( "media" ).parent( featuresFolder.getPath() ) );

        final Bundle bundle = FrameworkUtil.getBundle( this.getClass() );

        BundleMediaImporter.create().
            bundle( bundle ).
            startDirectory( "/media" ).
            contentService( contentService ).destination( featuresFolder.getPath() ).
            creator( PrincipalKey.ofEnterpriseAdmin() ).
            build().
            start();
    }

    private CreateContentParams makeFolder()
    {
        return new CreateContentParams().
            owner( PrincipalKey.ofEnterpriseAdmin() ).
            contentData( new PropertyTree() ).
            type( ContentTypeName.folder() );
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

    public void setContentTypeService( final ContentTypeService contentTypeService )
    {
        this.contentTypeService = contentTypeService;
    }


}
