package com.enonic.wem.build

import com.bluepapa32.gradle.plugins.watch.WatchPlugin
import org.dm.gradle.plugins.bundle.BundlePlugin
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.api.plugins.JavaPlugin
import org.gradle.api.plugins.MavenPlugin

class ModulePlugin
    implements Plugin<Project>
{
    private Project project

    private ModuleExtension ext

    @Override
    void apply( final Project project )
    {
        this.project = project
        this.ext = ModuleExtension.create( this.project )

        applyJavaSettings()
        applyMavenSettings()
        applyWatchSettings()
    }

    private void applyJavaSettings()
    {
        this.project.plugins.apply( JavaPlugin )
        this.project.plugins.apply( BundlePlugin )

        this.project.afterEvaluate {
            this.project.bundle {
                instruction 'Bundle-Name', this.ext.displayName
                instruction 'Export-Package', ''
                instruction 'Import-Package', '*;resolution:=optional'
                instruction '-removeheaders', 'Require-Capability'
            }
        }
    }

    private void applyMavenSettings()
    {
        this.project.plugins.apply( MavenPlugin )
    }

    private void applyWatchSettings()
    {
        this.project.plugins.apply( WatchPlugin )

        this.project.afterEvaluate {
            this.project.watch {
                everything {
                    files this.project.fileTree( dir: 'src', include: '**/*' )
                    tasks this.ext.watchTask
                }
            }
        }
    }
}
