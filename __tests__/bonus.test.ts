import babelTraverse from '@babel/traverse';
import { parse, ParserPlugin } from '@babel/parser';
import generate from '@babel/generator';
import * as t from '@babel/types';
import {createQueryScript,createQueryScripts} from '../src/index'
import queries from '../example-methods.json'

const printCode = (ast) => {
    console.log(
        generate(ast).code
    );
}

const expectCode = (asts) => {
    for(const ast of asts){
        expect(
            generate(ast).code
        ).toMatchSnapshot();
    }
}


// it('works', () => {
//     printCode(
//         createQueryScript(
//             {
//                 QUERY_INTERFANCE : 'UsePoolsQueryCustom',
//                 HOOK_NAME : "usePoolsCustom",
//                 REQUEST_TYPE : "QueryPoolsRequestCustom",
//                 RESPONSE_TYPE : "QueryPoolsResponseCustom", 
//                 QUERY_SERVICE_METHOD_NAME : "poolsCustom"
//             }
//         )
//     );
// });


it('works', () => {
    console.log(queries)
    expectCode(
        createQueryScripts(
            queries
        )
    );
});