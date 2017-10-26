'use strict';

var util = require('util');
var unirest = require('unirest');
var deasync = require('deasync');

var pharosApiEndpoint = "https://pharos.nih.gov/idg/api/v1/";

// mapping swagger-operationId to javascript-function
module.exports = {
    linkedTypes                     : linkedTypes
    , getConceptDetails             : getConceptDetails
    , getConcepts                   : getConcepts
    , getExactMatchesToConcept      : getExactMatchesToConcept
    , getExactMatchesToConceptList  : getExactMatchesToConceptList
    , getStatements                 : getStatements
    , getEvidence                   : getEvidence
};

// /types
function linkedTypes(req, res) {
    console.log("linkedTypes");

    var types = [];
    types.push({id: "targets", idmap : "idmap for targets to be defined", frequency: getTotalsFor("targets")});
    types.push({id: "ligands", idmap : "idmap for ligands to be defined", frequency: getTotalsFor("ligands")});
    types.push({id: "diseases", idmap : "idmap for diseases needs to be defined", frequency: getTotalsFor("diseases")});
    types.push({id: "assays", idmap : "idmap for assays to be defined", frequency: getTotalsFor("assays")});
    types.push({id: "structures", idmap : "idmap for structures needs to be defined", frequency: getTotalsFor("structures")});
    
    res.json(types);
}

function getTotalsFor(what) {
    var done = false;
    var total;
    unirest
        .get(pharosEndpoint + what)
        .send({"top": 1, "skip": 0})
        .end(function(response){
            //console.log("\n######################################\n" + what);
            //console.log(response.body);
            total = response.body.total;
            done = true;
        });
    // only return if result is available
    while(!done){deasync.sleep(10)}

    return total;
}

// /concepts/{conceptId}
function getConceptDetails(req, res) {
    console.log("getConceptDetails");

    var conceptId = req.swagger.params.conceptId.value;
    console.log("  conceptId:" + conceptId);

    // Mock
    var ret = [
        {
            id: "id"
            , name: "name"
            , semanticGroup: "semanticGroup"
            , synonyms: [
                "synonym1"
                , "synonym2"
            ]
            , definition: "definition"
            , details: [
                {tag: "tag", value: "value"}
                , {tag: "tag2", value: "value2"}
            ]
        }
    ]

    res.json(ret);
}

// /concepts
function getConcepts(req, res) {
    console.log("getConcepts");

    var keywords = req.swagger.params.keywords.value;
    var semgroups = req.swagger.params.semgroups.value;
    var pageNumber = req.swagger.params.pageNumber.value;
    var pageSize = req.swagger.params.pageSize.value;
    console.log("  keywords:" + keywords);
    console.log("  semgroups:" + semgroups);
    console.log("  pageNumber:" + pageNumber);
    console.log("  pageSize:" + pageSize);

    // Mock
    var ret = [
        {
            id: "id"
            , name: "name"
            , semanticGroup: "semanticGroup"
            , synonyms: [
                "synonym1"
                , "synonym2"
            ]
            , definition: "definition"
            , details: [
                {tag: "tag", value: "value"}
                , {tag: "tag2", value: "value2"}
            ]
        }
    ]

    res.json(ret);
}

// /exactmatches/{conceptId}
function getExactMatchesToConcept(req, res) {
    console.log("getExactMatchesToConcept");

    var conceptId = req.swagger.params.conceptId.value;
    console.log("  conceptId" + conceptId);

    // Mock
    var ret = ["string1", "string2"];

    res.json(ret);
}

// /exactmatches
function getExactMatchesToConceptList(req, res) {
    console.log("getExactMatchesToConceptList");
    
    var c = req.swagger.params.c.value;
    console.log("  c:" + c);

    // Mock
    var ret = ["string1", "string2"];

    res.json(ret);
}

// statements
function getStatements(req, res) {
    console.log("getStatements");

    var c = req.swagger.params.c.value;
    var pageNumber = req.swagger.params.pageNumber.value;
    var pageSize = req.swagger.params.pageSize.value;
    var keywords = req.swagger.params.keywords.value;
    var semgroups = req.swagger.params.semgroups.value;
    console.log("  c:" + c);
    console.log("  pageNumber:" + pageNumber);
    console.log("  pageSize:" + pageSize);
    console.log("  keywords:" + keywords);
    console.log("  semgroups:" + semgroups);

    // Mock
    var ret = [
        {
            id: "id"
            , subject: {id:"-1", name:"subject"}
            , predicate: {id:"-2", name:"predicate"}
            , object: {id:"-3", name:"object"}
        }
    ]

    res.json(ret);
}

// /evidence/{statementId}
function getEvidence(req, res) {
    console.log("getEvidence");

    var statementId = req.swagger.params.statementId.value;
    var keywords = req.swagger.params.keywords.value;
    var pageNumber = req.swagger.params.pageNumber.value;
    var pageSize = req.swagger.params.pageSize.value;
    console.log("  statementId:" + statementId);
    console.log("  keywords:" + keywords);
    console.log("  pageNumber:" + pageNumber);
    console.log("  pageSize:" + pageSize);

    // Mock
    var ret = [
        {
            id: "id"
            , label: "label"
            , date: "date"
        }
    ]

    res.json(ret);
}