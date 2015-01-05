package com.enonic.wem.sample.features;

import org.osgi.framework.Bundle;
import org.osgi.framework.FrameworkUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.enonic.wem.api.content.ContentPath;
import com.enonic.wem.api.content.ContentService;
import com.enonic.wem.api.content.CreateContentParams;
import com.enonic.wem.api.data.PropertyTree;
import com.enonic.wem.api.export.ExportService;
import com.enonic.wem.api.export.ImportNodesParams;
import com.enonic.wem.api.export.NodeImportResult;
import com.enonic.wem.api.initializer.DataInitializer;
import com.enonic.wem.api.node.NodePath;
import com.enonic.wem.api.schema.content.ContentTypeName;
import com.enonic.wem.api.security.RoleKeys;
import com.enonic.wem.api.vfs.VirtualFile;
import com.enonic.wem.api.vfs.VirtualFiles;

public final class FeaturesInitializer
    implements DataInitializer
{
    private ContentService contentService;

    private ExportService exportService;

    private final Logger LOG = LoggerFactory.getLogger( FeaturesInitializer.class );

    @Override
    public void initialize()
        throws Exception
    {
        if ( hasContent( ContentPath.from( "/features" ) ) )
        {
            return;
        }

        final Bundle bundle = FrameworkUtil.getBundle( this.getClass() );

        final VirtualFile source = VirtualFiles.from( bundle, "/import" );

        final NodeImportResult nodeImportResult = this.exportService.importNodes( ImportNodesParams.create().
            source( source ).
            targetPath( NodePath.newPath( "/content" ).build() ).
            build() );

        logImport( nodeImportResult );

    }

    private void logImport( final NodeImportResult nodeImportResult )
    {
        LOG.info( "-------------------" );
        LOG.info( "Imported nodes:" );
        for ( final NodePath nodePath : nodeImportResult.getAddedNodes() )
        {
            LOG.info( nodePath.toString() );
        }

        LOG.info( "-------------------" );
        LOG.info( "Binaries:" );
        for ( final String binaryRef : nodeImportResult.getExportedBinaries() )
        {
            LOG.info( binaryRef );
        }

        LOG.info( "-------------------" );
        LOG.info( "Errors:" );
        for ( final NodeImportResult.ImportError importError : nodeImportResult.getImportErrors() )
        {
            LOG.info( importError.getMessage(), importError.getException() );
        }
    }

    private CreateContentParams makeFolder()
    {
        return new CreateContentParams().
            owner( RoleKeys.ENTERPRISE_ADMIN ).
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

    @SuppressWarnings("UnusedDeclaration")
    public void setExportService( final ExportService exportService )
    {
        this.exportService = exportService;
    }
}
