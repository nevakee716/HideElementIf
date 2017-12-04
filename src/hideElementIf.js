(function(cwApi, $) { 
  "use strict";

    /********************************************************************************
    Config
    *********************************************************************************/

    var hideElementIf = {};
    hideElementIf.config = {
        "aidedarchitecture" : [
            {
                "action": "changeStyle",
                "style": "display",
                "styleValue": "none",
                "type" : "tab", 
                "id" : "tab5",
                "property" : "id",
                "operator"  : "!=",
                "value" : "82"
            },
            {
                "action": "changeStyle",
                "style": "list-style-type",
                "styleValue": "none",
                "type" : "class", 
                "class" : "service_innovant_20143_1782297349",
            },
            {
                "action": "changeStyle",
                "style": "0",
                "styleValue": "padding-left",
                "type" : "class", 
                "class" : "service_innovant_20143_1782297349",
            }
        ],
        "processus" : [
            {
                "action": "changeView",
                "viewName" : "processus_solva",
                "property" : "livre2",
                "operator"  : "=",
                "value" : true
            },
            {
                "action": "changeStyle",
                "style": "display",
                "styleValue": "none",
                "type" : "tab", 
                "id" : "tab7",
                "property" : "type",
                "operator"  : "!=",
                "value" : "Processus"
            },
            {
                "action": "changeStyle",
                "style": "display",
                "styleValue": "none",
                "type" : "tab", 
                "id" : "tab3",
            },
            {
                "action": "changeStyle",
                "style": "display",
                "styleValue": "block",
                "type" : "tab", 
                "id" : "tab3",
                "property" : "type",
                "operator"  : "=",
                "value" : ["Processus","Macro-Processus","Activité"]
            }
        ],
        "mgenapplication" : [
            {
                "style": "display",
                "styleValue": "none",
                "type" : "view",
                "id" : "saisie_application",
            },
            { // A supprimer pour afficher les liens c4W même si l'objet n'est pas validé
                "action": "changeStyle",
                "style": "display",
                "styleValue": "none",
                "type" : "class",
                "class" : "CwPropertiesLayoutHelpText",
                "property" : "validated",
                "operator"  : "!=",
                "value" : true
            },
            {
                "action": "changeStyle",
                "style": "display",
                "styleValue": "none",
                "type" : "class",
                "class" : "fa-question-circle",
            }
        ],
    };

    /********************************************************************************
    Custom Action for Single Page : See Impact here http://bit.ly/2qy5bvB
    *********************************************************************************/
    cwCustomerSiteActions.doActionsForSingle_Custom = function (rootNode) { 
        var currentView, url,i;
        currentView = cwAPI.getCurrentView();

        for(i in cwAPI.customLibs.doActionForSingle) {
            if(cwAPI.customLibs.doActionForSingle.hasOwnProperty(i)) {
                if (typeof(cwAPI.customLibs.doActionForSingle[i]) === "function"){
                    cwAPI.customLibs.doActionForSingle[i](rootNode,currentView.cwView);
                }   
            }
        }
    };

    hideElementIf.do = function(rootNode){
        var config,i;
        this.viewName = cwAPI.getCurrentView().cwView;
        var doAction = true;
        if(this.config && this.config.hasOwnProperty(this.viewName)) {
            for (var i = 0; i < this.config[this.viewName].length; i += 1) {
                var config = this.config[this.viewName][i];
                if(config.hasOwnProperty("property") && config.hasOwnProperty("operator") && config.hasOwnProperty("value")) {
                    doAction = this.isActionToDo(rootNode,config);
                } else {
                    doAction = true;
                }
                if(doAction) {
                    this.execute(config,rootNode);
                }
            }
        }
    };

    hideElementIf.isActionToDo = function(rootNode,config){
        if(rootNode) {
            var objPropertyValue;
            if(config.property == "id") {
                objPropertyValue = rootNode.object_id;
            } else {
                objPropertyValue = rootNode.properties[config.property];
            }
            switch(config.operator) {
                case "=":
                    if(Array.isArray(config.value))  {
                        for (var i = 0; i < config.value.length; i += 1) {
                           if(objPropertyValue == config.value[i] ) return true; 
                        }
                    }
                    if(objPropertyValue == config.value) return true;
                    break;
                case "<":
                    if(Array.isArray(config.value))  {
                        for (var i = 0; i < config.value.length; i += 1) {
                           if(objPropertyValue < config.value[i] ) return true; 
                        }
                    }
                    if(objPropertyValue < config.value) return true;
                    break;
                case "<=":
                    if(Array.isArray(config.value))  {
                        for (var i = 0; i < config.value.length; i += 1) {
                           if(objPropertyValue <= config.value[i] ) return true; 
                        }
                    }
                    if(objPropertyValue <= config.value) return true;
                    break;
                case ">":
                    if(Array.isArray(config.value))  {
                        for (var i = 0; i < config.value.length; i += 1) {
                           if(objPropertyValue > config.value[i] ) return true; 
                        }
                    }
                    if(objPropertyValue > config.value) return true;
                    break;
                case ">=":
                    if(Array.isArray(config.value))  {
                        for (var i = 0; i < config.value.length; i += 1) {
                           if(objPropertyValue >= config.value[i] ) return true; 
                        }
                    }
                    if(objPropertyValue >= config.value) return true;
                    break;
                case "!=":
                    if(Array.isArray(config.value))  {
                        for (var i = 0; i < config.value.length; i += 1) {
                           if(objPropertyValue != config.value[i] ) return true; 
                        }
                    }
                    if(objPropertyValue != config.value) return true;
                    break;
                default:
                    return false;
            }
        }
        return false;
    };

    hideElementIf.execute = function(config,rootNode){
        switch(config.action) {
            case "changeStyle":
                if(config.hasOwnProperty("style") && config.hasOwnProperty("styleValue") && config.hasOwnProperty("type") && (config.hasOwnProperty("id")  || config.hasOwnProperty("class")) ) {
                    switch(config.type.toLowerCase()) {
                        case "tab":
                            this.actionOnId(config.style,config.styleValue,this.viewName + "-tab-" +  config.id);
                            break;
                        case "propertygroup":
                            this.actionOnClassAndId(config.style,config.styleValue,"cwPropertiesTableContainer",config.id.toLowerCase());
                            break;
                        case "class":
                            this.actionOnClass(config.style,config.styleValue,config.class);
                            break;
                        case "id":
                            this.actionOnId(config.style,config.styleValue,config.id);
                            break;
                        case "view":
                            this.actionOnId(config.style,config.styleValue,"navview-" + config.id);
                            break;
                        default:
                            return false;
                    }
                }
                break;
            case "changeView":
                if(config.hasOwnProperty("viewName")) {
                   this.actionChangeView(config.viewName,rootNode); 
                }
            default:
                return false;
        }
    };

    hideElementIf.actionOnClass = function(style,value,className){

        var elements = document.getElementsByClassName(className);
        var i;
        for (i = 0; i < elements.length; i++) {
            elements[i].style[style] = value;               
        }
    };
    
    hideElementIf.actionOnId = function(style,value,id){
        var element = document.getElementById(id);
        if(element && element.style) {
            element.style[style] = value;               
        }
    };
    
    hideElementIf.actionOnClassAndId = function(style,value,className,id){
        var elements = document.getElementsByClassName(className);
        var i;
        for (i = 0; i < elements.length; i++) {
            if(elements[i].id.indexOf(id)!== -1) {
                elements[i].style[style] = value;               
            }       
        }
    };

    hideElementIf.actionChangeView = function(view,item){
        location.href = cwApi.createLinkForSingleView(view,item);
    };



    /********************************************************************************
    Configs : add trigger for single page
    *********************************************************************************/
    if(cwAPI.customLibs === undefined) { cwAPI.customLibs = {};}
    if(cwAPI.customLibs.doActionForSingle === undefined) { cwAPI.customLibs.doActionForSingle = {};}
    cwAPI.customLibs.doActionForSingle.hideElementIf = hideElementIf.do.bind(hideElementIf); 

}(cwAPI, jQuery));