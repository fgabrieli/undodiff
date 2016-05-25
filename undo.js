/**
 * Copyright (c) 2013 Web.com Group, Inc. All Rights Reserved.
 * 
 * This is an unpublished work protected by Web.com Group, Inc. as a trade
 * secret, and is not to be used or disclosed except as expressly provided in a
 * written license agreement executed by you and Web.com Group, Inc.
 * 
 * @author Fernando Gabrieli
 */

(function($) {
    'use strict';

    var undoManager = {
        stack : [],

        index : -1,

        actions : {
            UNDO : 'undo',
            REDO : 'redo'
        },

        // @Override using setup(opts)
        opts : {
            getSnapshot : function() {
            },
            
            setSnapshot : function(snapshot) {
            },
            
            beforeUndo : function(previousState) {
            },
            
            afterUndo : function() {
            },
            
            beforeRedo : function(nextState) {
            },
            
            afterRedo : function() {
            }
        },

        setup : function(opts) {
            $.extend(this.opts, opts);
        },

        takeSnapshot : function() {
            this.clearRedo();

            this.save(this.opts.getSnapshot());
        },

        save : function(state) {
            this.stack.push(state);

            this.index++;
        },

        clearRedo : function() {
            this.stack = this.stack.slice(0, this.index + 1);
        },

        canUndo : function() {
            return this.index - 1 != -1
        },

        undo : function() {
            if (this.canUndo()) {
                var previousState = this.stack[--this.index];

                this.opts.beforeUndo(previousState);

                this.restore(previousState);

                this.opts.afterUndo();
            }
        },

        restore : function(state) {
            this.opts.setSnapshot(state);
        },

        canRedo : function() {
            return (typeof this.stack[this.index + 1] != 'undefined');
        },

        redo : function() {
            if (this.canRedo()) {
                var nextState = this.stack[++this.index];

                this.opts.beforeRedo(nextState);

                this.restore(nextState);

                this.opts.afterRedo();
            }
        }
    }

    window.undoManager = undoManager;
    
})(jQuery);