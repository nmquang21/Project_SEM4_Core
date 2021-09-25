/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {

    // %REMOVE_START%
    // The configuration options below are needed when running CKEditor from source files.
    //config.plugins = 'dialogui,dialog,about,basicstyles,blockquote,format_buttons,table,image,horizontalrule,clipboard,button,toolbar,enterkey,entities,floatingspace,wysiwygarea,indent,indentlist,fakeobjects,link,list,undo,lineutils,widgetselection,widget,codesnippet';
    config.plugins = 'basicstyles,toolbar,wysiwygarea,link,image,codesnippet';
    config.skin = 'moono-lisa';
    // %REMOVE_END%

    // Define changes to default configuration here.
    // For complete reference see:
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config
    //config.Format = 'p;h1;h2;h3;h4;h5;h6;pre;address;div';
    // The toolbar groups arrangement, optimized for a single toolbar row.
    config.toolbarGroups = [
        //{ name: 'document', groups: ['mode', 'document', 'doctools'] },
        //{ name: 'clipboard', groups: ['clipboard', 'undo'] },
        //{ name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
        //{ name: 'forms' },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        
        //{ name: 'paragraph', groups: ['blocks', 'list', 'align', 'bidi'] },
        { name: 'links' },

        //{ name: 'styles' },
        { name: 'insert' },
        //{ name: 'colors' },
        { name: 'others' },
        { name: 'tools' }
    ];

    config.extraPlugins = 'maximize';

    // The default plugins included in the basic setup define some buttons that
    // are not needed in a basic editor. They are removed here.
    config.removeButtons = 'Cut,Copy,Paste,Anchor,Underline,Subscript,Superscript,h1,h2,h3,h4,h5,h6,Unlink,Strike';

    // Dialog windows are also simplified.
    config.removeDialogTabs = 'image:advanced;link:advanced';
};
