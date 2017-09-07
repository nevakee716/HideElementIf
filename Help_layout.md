| **Name** | **HideElementIf** | **Version** | 
| --- | --- | --- |
| **Updated by** | Mathias PFAUWADEL | 1.0 |


## Patch Notes

* 1.0 : 1st version working

## To be Done

* More Options


## Description 
On an ObjectPage, allow you to hide or show and element(tab, property-group, view or html) according to a property of the object

## ScreenShot

Here, we are on the objectPage of the aideArchitecture id = 3, we can see 3 tabs.
<img src="https://raw.githubusercontent.com/nevakee716/HideElementIf/master/screen/1.jpg" alt="Drawing" style="width: 95%;"/>

Here, we are on the objectPage of the aideArchitecture id = 82, we can see only 1 tab.
<img src="https://raw.githubusercontent.com/nevakee716/HideElementIf/master/screen/2.jpg" alt="Drawing" style="width: 95%;"/>

## Configuration

The general structure is the following.
In Evolve\Site\bin\webDesigner\custom\Marketplace\libs\HideElementIf\src\hideElementIf.js
You can modify the configuration
```
/********************************************************************************
Config
*********************************************************************************/

var hideElementIf = {};
hideElementIf.config = {
	"{viewName}" : [{action},{action2}]
	"{viewName2}" : [{action3}]
};
```
{viewName} correspond to the objectPage pageName 
<img src="https://raw.githubusercontent.com/nevakee716/HideElementIf/master/screen/2.jpg" alt="Drawing" style="width: 95%;"/>
you can put as many view as you want
On each viewName you can add several action, action have the following syntax : 
```
{
   "style": "{style}",
   "styleValue": "{styleValue}",
   "type" : "{type}", 
   "id" : "{id}",
   "class" : "{class}",
   "property" : "{property}",
   "operator"  : "{logicalOperator}",
   "value" : "{value}"
}
```
{attributeToModify} correspond to the css style attribute we want to interact with, here we will act on display to hide or show an object.
{newValue} correspond to the css style value we want to put if the property match, here the value will be "none" if we want to hide an element and "block" if we want to show it.

{type} : describe the type of element we want to hide or show. Possible Value are : 
 - "tab" correspond to a tab
 - "propertygroup": correspond to a propertygroup
 - "class": correspond to the class of HTML elements
 - "id" : correspond to the id of HTML elements
 - "view": correspond to another view for exemple on an objectpage, you can have 2 views and you want to display only one.

if you use type tab ,propertygroup ,id or view, you need to put the attribute id : 
- {id} correspond to the html id, if you use type = id
- {id} correspond to the id of the element which is define in evolve, if you use type = tab, propertygroup
<img src="https://raw.githubusercontent.com/nevakee716/HideElementIf/master/screen/4.jpg" alt="Drawing" style="width: 95%;"/>
<img src="https://raw.githubusercontent.com/nevakee716/HideElementIf/master/screen/5.jpg" alt="Drawing" style="width: 95%;"/>
- {id} correspond to the id of the pageName of the view which is define in evolve, if you use type = view, propertygroup
<img src="https://raw.githubusercontent.com/nevakee716/HideElementIf/master/screen/3.jpg" alt="Drawing" style="width: 95%;"/>

if you use type class, you need to put the attribute class: {class} will describe the className of the HTML element, for exemple, "cw-edit-buttons" correspond to the value of the edit button

if you don't put property, the action will execute anyway.
if you put property, the action will execute if {property} {Operator} {value} is true
"{property}" correspond to the scriptname of property value (don't forget to select it in your objectpage in evolveDesigner)
"{Operator}"  correspond to the logicalOperator can be : =, <, <=, >, >=, !=
"{value}" correspond to the value to compare

## Exemple : 

### Always Hide tab : 

Here we want to hide all tab in the objectPage aidearchitecture
```
  "aidedarchitecture" : [
  {
    "style": "display",
    "styleValue": "none",
    "type" : "class", 
    "class" : "cwTabLink",
  },
```

### Hide Tab :

Here we want to hide a specific tab in the objectPage aidearchitecture, if the id of the objectPage is different from 82.
```
"aidedarchitecture" : [
{
    "style": "display",
    "styleValue": "none",
    "type" : "tab", 
    "id" : "tab5",
    "property" : "id",
    "sign"  : "!=",
    "value" : "82"
    },
```

### Show propertyGroup:

```
{
   "style": "display",
   "styleValue": "black",
   "type" : "propertyGroup", 
   "id" : "propertyGroup_1961166630",
},
```

## Cohabitation with other specific

Here is a list of all the specific and the function they modified. If you have other personnal specific that use the same function, you will need to merge them in to the main.js
https://docs.google.com/spreadsheets/d/19Mi3LsdQlRuTGFAZiGtLFPGcLhrScWZFTSsm-qQ_BiY/edit#gid=0