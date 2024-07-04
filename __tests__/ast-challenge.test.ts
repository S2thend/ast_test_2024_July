import babelTraverse from '@babel/traverse';
import { parse, ParserPlugin } from '@babel/parser';
import generate from '@babel/generator';
import * as t from '@babel/types';
import {astCodeSnippet} from '../src/index'

const printCode = (ast) => {
    console.log(
        generate(ast).code
    );
}

const expectCode = (ast) => {
    expect(
        generate(ast).code
    ).toMatchSnapshot();
}


it('works', () => {
    expectCode(
        astCodeSnippet
    );
});