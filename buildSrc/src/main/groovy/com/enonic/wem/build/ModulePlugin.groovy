package com.enonic.wem.build

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
    }

    private void applyJavaSettings()
    {
        this.project.plugins.apply( JavaPlugin )

        this.project.afterEvaluate {
            this.project.jar {
                manifest {
                    attributes 'Bundle-ManifestVersion': '2',
                               'Bundle-SymbolicName': this.ext.name,
                               'Bundle-Version': this.project.version,
                               'Bundle-Name': this.ext.displayName
                }
            }
        }
    }

    private void applyMavenSettings()
    {
        this.project.plugins.apply( MavenPlugin )
    }
}
