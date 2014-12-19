package com.enonic.wem.sample.features;


import java.net.URL;
import java.util.Collections;

import org.apache.commons.io.FilenameUtils;
import org.osgi.framework.Bundle;

public abstract class BundleDirectoryTraverser
{
    private Bundle bundle;

    private String startDirectory;

    private String filePattern;

    public BundleDirectoryTraverser( final Builder builder )
    {
        this.bundle = builder.bundle;
        this.startDirectory = builder.startDirectory;
        this.filePattern = builder.filePattern;
    }

    public void importMedia()
        throws Exception
    {
        for ( final URL url : Collections.list( bundle.findEntries( startDirectory, filePattern, true ) ) )
        {
            final String filePath = url.getFile();
            if ( filePath.endsWith( "/" ) )
            {
                final String pathWithoutEndSeparator = FilenameUtils.getFullPathNoEndSeparator( filePath );
                final String fileName = FilenameUtils.getName( pathWithoutEndSeparator );
                final String fileParent = "/" + FilenameUtils.getPath( pathWithoutEndSeparator );

                foundDirectory( fileName, fileParent );
            }
            else
            {
                final String fileName = FilenameUtils.getName( filePath );
                final String fileParent = "/" + FilenameUtils.getPath( filePath );
                foundFile( fileName, fileParent );
            }
        }
    }

    public abstract void foundDirectory( final String name, final String parentPath )
        throws Exception;

    public abstract void foundFile( final String name, final String parentPath )
        throws Exception;

    public static class Builder
    {
        private Bundle bundle;

        private String startDirectory;

        private String filePattern;

        public Builder bundle( final Bundle value )
        {
            bundle = value;
            return this;
        }

        public Builder startDirectory( final String value )
        {
            startDirectory = value;
            return this;
        }

        public Builder filePattern( final String value )
        {
            filePattern = value;
            return this;
        }


    }

}