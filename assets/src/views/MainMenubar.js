"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Vue = require("vue");
const $ = require("jquery");
const av_ts_1 = require("av-ts");
const Store_1 = require("../vuex/Store");
let MainMenubar = class MainMenubar extends Vue {
    constructor() {
        super(...arguments);
        this.id = "MainMenubar";
        this.menuItems = [
            "Read VTK XML particle file",
            "Read generated particle file",
            "Read Vaango input file",
            "Save Vaango input file",
            "About",
            "Exit"
        ];
        this.selectedMenuIndex = 0;
    }
    selectMenu(menuItem, menuIndex) {
        console.log("Menu item " + menuItem + " index  " + menuIndex + " selected.");
        this.selectedMenuIndex = menuIndex;
    }
    readVTKXMLParticleFile(event) {
        console.log("Reading VTK XML file");
        // Choose first file in selected list
        let file = event.target.files[0];
        console.log(file);
        // Read the file as text and store data
        this.readXMLFile(file, "vtk-xml");
    }
    readGeneratedParticleFile(e) {
        console.log("Read Generated Particle file not implemented yet.");
    }
    readVaangoInputFile(event) {
        console.log("Reading Vaango XML file");
        // Choose first file in selected list
        let file = event.target.files[0];
        console.log(file);
        // Read the file as text and store data
        this.readXMLFile(file, "vaango-xml");
    }
    saveVaangoInputFile(e) {
        console.log("Save Vaango input file not implemented yet.");
    }
    readXMLFile(file, type) {
        if (file) {
            console.log("Found file");
            let reader = new FileReader();
            reader.readAsText(file);
            //console.log(reader.error);
            // Use a closure to capture the file information
            var xmlDoc = null;
            reader.onload = (function (theFile, fileType, storeXMLDoc) {
                return function (event) {
                    let contents = event.target.result;
                    console.log("Reading file " + theFile.name +
                        "size = " + theFile.size +
                        "starts with: " +
                        contents.substr(1, contents.indexOf("n")));
                    let xmlData = reader.result;
                    console.log(xmlData);
                    let xmlDoc = $.parseXML(xmlData);
                    console.log(xmlDoc);
                    storeXMLDoc(fileType, xmlDoc);
                };
            })(file, type, this.storeXMLDoc);
        }
        else {
            console.log("Unable to load file ", file.name);
        }
    }
    storeXMLDoc(fileType, xmlDoc) {
        console.log("Calling store xml doc");
        this.d_xmlDoc = xmlDoc;
        if (fileType === "vtk-xml") {
            this.parseAndSaveVTKXML();
        }
        else if (fileType === "vaango-xml") {
            this.parseAndSaveVaangoXML();
        }
    }
    parseAndSaveVTKXML() {
        console.log("Parsing VTK XML");
        let $xml = $(this.d_xmlDoc);
        let fileType = $xml.find("VTKFile").attr('type');
        if (fileType != "UnstructuredGrid") {
            console.log("Invalid file type" + fileType);
        }
        // Read time point
        var time = $xml.find("FieldData")
            .find("DataArray").text().trim();
        console.log("Time = " + parseFloat(time));
        // Read the number of points in the data set
        var numPts = $xml.find("Piece").attr('NumberOfPoints').trim();
        console.log("Number of points = " + parseFloat(numPts));
        // Read the state data
        var pointData = {};
        $($xml.find("PointData")
            .find("DataArray"))
            .each(function () {
            let data = $(this);
            let key = data.attr("Name");
            let type = data.attr("type");
            let numComponents = data.attr("NumberOfComponents");
            console.log("Found " + key);
            console.log("numComponents " + numComponents);
            if (numComponents) {
                let numComp = parseFloat(numComponents);
                let dataArray = data.text().trim()
                    .replace(/\s\s+/g, ' ')
                    .replace(/(\r\n|\n|\r)/gm, " ")
                    .split(" ")
                    .map(parseFloat);
                let arrayOfVec = [];
                while (dataArray.length) {
                    arrayOfVec.push(dataArray.splice(0, numComp));
                }
                pointData[key] = arrayOfVec;
            }
            else {
                pointData[key] = data.text().trim()
                    .replace(/\s\s+/g, ' ')
                    .replace(/(\r\n|\n|\r)/gm, " ")
                    .split(" ")
                    .map(parseFloat);
            }
        });
        // Read the position data
        let points = $xml.find("Points")
            .find("DataArray");
        let numComponents = points.attr("NumberOfComponents");
        let dataArray = points.text().trim()
            .replace(/\s\s+/g, ' ')
            .replace(/(\r\n|\n|\r)/gm, " ")
            .split(" ")
            .map(parseFloat);
        let numComp = parseFloat(numComponents);
        let arrayOfVec = [];
        while (dataArray.length) {
            arrayOfVec.push(dataArray.splice(0, numComp));
        }
        pointData["Position"] = arrayOfVec;
        console.log(pointData);
        // Save the data
        Store_1.default.commit('SET_PARTICLE_DATA', pointData);
    }
    parseAndSaveVaangoXML() {
        console.log("Parsing VaangoTK XML");
        let $xml = $(this.d_xmlDoc);
        let simType = $xml.find("SimulationComponent").attr('type');
        console.log(simType);
    }
};
MainMenubar = __decorate([
    av_ts_1.Component({
        name: 'main-menubar'
    })
], MainMenubar);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainMenubar;
