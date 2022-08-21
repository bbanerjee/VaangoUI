import * as Vue from "vue";
import $ = require("jquery");
import {Component, Lifecycle} from "av-ts";

import Store from "../vuex/Store";

@Component({
  name: 'main-menubar'
})
export default class MainMenubar extends Vue {
  
  public id : string = "MainMenubar";
  public menuItems: string[] = [
    "Read VTK XML particle file",
    "Read generated particle file",
    "Read Vaango input file",
    "Save Vaango input file",
    "About",
    "Exit"
  ];
  public selectedMenuIndex: number = 0;
  public itemIsActive: boolean [];
  public menuVisible: boolean;

  private d_xmlDoc: any;

  @Lifecycle
  created() {
    this.selectedMenuIndex = 0;
    this.menuVisible = false;
    this.itemIsActive = [];
    for (let item = 0; item < this.menuItems.length; item++) {
      this.itemIsActive[item] = false;
    };
  }

  public selectMenu(menuItem: string, menuIndex: number) {
    for (let item = 0; item < this.menuItems.length; item++) {
      this.itemIsActive[item] = false;
    };

    console.log("Menu item " + menuItem + " index  " + menuIndex + " selected.");
    this.selectedMenuIndex = menuIndex;
    this.itemIsActive[menuIndex] = true;
  }

  public addToggleMenu(menuItem: string, menuIndex: number) {
    console.log("add menuVisible", this.menuVisible)
    if (!this.menuVisible) {
      console.log("Added menu");
      $("#main-menubar-dropdown-menu").addClass("uk-open");
      $("#main-menubar-dropdown-icon").addClass("uk-open");
      this.menuVisible = true;
    }
  }
  public removeToggleMenu(menuItem: string, menuIndex: number) {
    // Handle the exit option
    console.log("remove menuVisible", this.menuVisible)
    if (this.menuVisible) {
      if (menuItem === "Exit") {
        console.log("Removed menu");
        $("#main-menubar-dropdown-menu").removeClass("uk-open");
        $("#main-menubar-dropdown-icon").removeClass("uk-open");
        this.menuVisible = false;
      }
    }
  }
  public removeMenu() {
    // Handle the exit option
    console.log("remove menuVisible", this.menuVisible)
    if (this.menuVisible) {
      $("#main-menubar-dropdown-menu").removeClass("uk-open");
      $("#main-menubar-dropdown-icon").removeClass("uk-open");
      this.menuVisible = false;
    }
  }

  // Make selectedMenuIndex a computed property
  get getSelectedMenuIndex() {
    return this.selectedMenuIndex;
  }

  public isActive(menuIndex: number) {
    console.log("isActive called: " + this.itemIsActive[menuIndex]);
    return this.itemIsActive[menuIndex];
  }

  public readVTKXMLParticleFile(event: any) {
    console.log("Reading VTK XML file");

    // Choose first file in selected list
    let file = event.target.files[0];
    console.log(file);

    // Read the file as text and store data
    this.readXMLFile(file, "vtk-xml");
  }

  public readGeneratedParticleFile(e: any) {
    console.log("Read Generated Particle file not implemented yet.")
  }

  public readVaangoInputFile(event: any) {
    console.log("Reading Vaango XML file");

    // Choose first file in selected list
    let file = event.target.files[0];
    console.log(file);

    // Read the file as text and store data
    this.readXMLFile(file, "vaango-xml");
  }

  public saveVaangoInputFile(e: any) {
    console.log("Save Vaango input file not implemented yet.")
  }

  public readXMLFile(file: any, type: string) {

    if (file) {
      console.log("Found file");
      let reader = new FileReader();
      reader.readAsText(file);
      //console.log(reader.error);

      // Use a closure to capture the file information
      var xmlDoc : any = null;
      reader.onload = (
        function(theFile: any, fileType: string, storeXMLDoc: any) {
          return function(event: any) {
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
        }
      )(file, type, this.storeXMLDoc);

    } else {
      console.log("Unable to load file ", file.name);
    }
  }

  public storeXMLDoc(fileType: string, xmlDoc : any) {
    console.log("Calling store xml doc");
    this.d_xmlDoc = xmlDoc;
    if (fileType === "vtk-xml") {
      this.parseAndSaveVTKXML();
    } else if (fileType === "vaango-xml") {
      this.parseAndSaveVaangoXML();
    }
    this.removeMenu();
  }

  public parseAndSaveVTKXML() {
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
    var pointData:any = {};
    $($xml.find("PointData")
          .find("DataArray"))
          .each(
      function () {
        let data = $(this);
        let key = data.attr("Name");
        let type = data.attr("type");
        let numComponents = data.attr("NumberOfComponents");
        console.log("Found " + key);
        console.log("numComponents " + numComponents);
        if (numComponents) {
          let numComp = parseFloat(numComponents);
          let dataArray = data.text().trim()
                                     .replace( /\s\s+/g, ' ' )
                                     .replace(/(\r\n|\n|\r)/gm," ")
                                     .split(" ")
                                     .map(parseFloat);
          let arrayOfVec : any = [];
          while (dataArray.length) {
            arrayOfVec.push(dataArray.splice(0,numComp));                   
          }
          pointData[key] = arrayOfVec;
        } else {
          pointData[key] = data.text().trim()
                                      .replace( /\s\s+/g, ' ' )
                                      .replace(/(\r\n|\n|\r)/gm," ")
                                      .split(" ")
                                      .map(parseFloat);
        }
      }
    );

    // Read the position data
    let points = $xml.find("Points")
                     .find("DataArray");
    let numComponents = points.attr("NumberOfComponents");
    let dataArray = points.text().trim()
                                 .replace( /\s\s+/g, ' ' )
                                 .replace(/(\r\n|\n|\r)/gm," ")
                                 .split(" ")
                                 .map(parseFloat);
    let numComp = parseFloat(numComponents);
    let arrayOfVec : any = [];
    while (dataArray.length) {
      arrayOfVec.push(dataArray.splice(0,numComp));                   
    }
    pointData["Position"] = arrayOfVec;
    console.log(pointData);

    // Save the data
    Store.commit('SET_PARTICLE_DATA', pointData);
  }

  public parseAndSaveVaangoXML() {
    console.log("Parsing VaangoTK XML");
    let $xml = $(this.d_xmlDoc);
    let simType = $xml.find("SimulationComponent").attr('type');
    console.log(simType);
  }
}