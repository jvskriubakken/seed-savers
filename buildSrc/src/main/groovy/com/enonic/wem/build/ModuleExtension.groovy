package com.enonic.wem.build

import org.gradle.api.Project

class ModuleExtension
{
    final static String NAME = 'module'

    def name

    def displayName

    def watchTask = 'install'

    ModuleExtension( final Project project )
    {
        this.name = "${project.group}.${project.name}"
        this.displayName = project.name
    }

    static ModuleExtension get( final Project project )
    {
        return project.extensions.getByType( ModuleExtension )
    }

    static ModuleExtension create( final Project project )
    {
        return project.extensions.create( NAME, ModuleExtension, project )
    }
}
