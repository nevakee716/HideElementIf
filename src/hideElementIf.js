(function(cwApi, $) { 
  "use strict";

    /********************************************************************************
    Config
    *********************************************************************************/

    var hideElementIf = {};
    hideElementIf.config = {
        "aidedarchitecture" : [
            {
                "style": "display",
                "styleValue": "none",
                "type" : "tab", 
                "id" : "tab5",
                "property" : "id",
                "operator"  : "!=",
                "value" : "82"
            }
        ],
        "processus" : [
            {
                "style": "display",
                "styleValue": "none",
                "type" : "view", 
                "id" : "mgenprocessus2",
            },
            {
                "style": "display",
                "styleValue": "none",
                "type" : "tab", 
                "id" : "tab4",
            },
            {
                "style": "display",
                "styleValue": "block",
                "type" : "tab", 
                "id" : "tab4",
                "property" : "type",
                "operator"  : "=",
                "value" : ["Processus","Domaine d'activité"]
            },
            {
                "style": "display",
                "styleValue": "none",
                "type" : "tab", 
                "id" : "tab7",
                "property" : "type",
                "operator"  : "!=",
                "value" : "Processus"
            },
            {
                "style": "display",
                "styleValue": "none",
                "type" : "tab", 
                "id" : "tab3",
            },
            {
                "style": "display",
                "styleValue": "block",
                "type" : "tab", 
                "id" : "tab3",
                "property" : "type",
                "operator"  : "=",
                "value" : ["Processus","Macro-Processus","Activité"]
            }
        ],
        "application" : [
            {
                "style": "display",
                "styleValue": "none",
                "type" : "view", 
                "id" : "saisie_application",
            }
        ]
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
                }
                if(doAction) {
                    this.execute(config);
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

    hideElementIf.execute = function(config){
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



    /********************************************************************************
    Configs : add trigger for single page
    *********************************************************************************/
    if(cwAPI.customLibs === undefined) { cwAPI.customLibs = {};}
    if(cwAPI.customLibs.doActionForSingle === undefined) { cwAPI.customLibs.doActionForSingle = {};}
    cwAPI.customLibs.doActionForSingle.hideElementIf = hideElementIf.do.bind(hideElementIf); 

}(cwAPI, jQuery));