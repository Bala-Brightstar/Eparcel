import { GetTacInfo } from 'src/app/services/schemas/tac/tac-schema';


export const testGetTacInfoNotmatch: GetTacInfo = {
    imei: '860161040646381',
    manufacturerid: 1,
    manufacturercode: 'APL',
    manufacturerdescription: 'Apple',
    modelfamilyid: 1,
    modelfamilycode: 'default',
    modelfamilydescription: 'default',
    modelid: 1,
    modelcode: 'A2160',
    modeldescription: 'A2160'
};

export const testGetTacInfoMatch: GetTacInfo = {
    imei: '860161040646381',
    manufacturerid: 1,
    manufacturercode: 'APL',
    manufacturerdescription: 'Apple',
    modelfamilyid: 1,
    modelfamilycode: 'default',
    modelfamilydescription: 'default',
    modelid: 7,
    modelcode: 'A2221',
    modeldescription: 'A2221'
};



