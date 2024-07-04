import * as t from '@babel/types';
import generate from '@babel/generator';

const optionalProperty = t.tsPropertySignature(
    t.identifier('request'),
    t.tsTypeAnnotation(t.tsTypeReference(t.identifier('QueryPoolsRequest')))
)
optionalProperty.optional = true;

// Creating the UsePoolsQuery interface declaration
const usePoolsQueryInterface = t.tsInterfaceDeclaration(
  t.identifier('UsePoolsQuery'),
  t.tsTypeParameterDeclaration([
    t.tsTypeParameter(null, null, 'TData'),
  ]),
  [t.tsExpressionWithTypeArguments(
      t.identifier('ReactQueryParams'),
      t.tsTypeParameterInstantiation([
          t.tsTypeReference(t.identifier('QueryPoolsResponse')),
          t.tsTypeReference(t.identifier('TData')),
        ])
    )],
    t.tsInterfaceBody([
        optionalProperty
    ])
);


const requestProperty = t.objectProperty(t.identifier('request'), t.identifier('request'), false, true)
const optionsProperty =  t.objectProperty(t.identifier('options'), t.identifier('options'), false, true)

const objectPattern = t.objectPattern([requestProperty, optionsProperty]);

const typeAnnotation = t.tsTypeAnnotation(t.tsTypeReference(
  t.identifier('UsePoolsQuery'),
  t.tsTypeParameterInstantiation([
    t.tsTypeReference(t.identifier('TData')),
  ]),
))

objectPattern.typeAnnotation = typeAnnotation;

const callExperssionTypeParameter = t.tsTypeParameterInstantiation([
  t.tsTypeReference(t.identifier('QueryPoolsResponse')),
  t.tsTypeReference(t.identifier('Error')),
  t.tsTypeReference(t.identifier('TData')),
])

const callExperssion = t.callExpression(
  t.identifier('useQuery'),
  [
    t.arrayExpression([
      t.stringLiteral('poolsQuery'),
      t.identifier('request'),
    ]),
    t.arrowFunctionExpression(
      [],
      t.blockStatement([
        t.ifStatement(
          t.unaryExpression('!', t.identifier('queryService')),
          t.throwStatement(
            t.newExpression(t.identifier('Error'), [
              t.stringLiteral('Query Service not initialized'),
            ]),
          ),
        ),
        t.returnStatement(
          t.callExpression(
            t.memberExpression(
              t.identifier('queryService'),
              t.identifier('pools'),
            ),
            [t.identifier('request')],
          ),
        ),
      ]),
    ),
    t.identifier('options'),
  ]
)

callExperssion.typeParameters = callExperssionTypeParameter

const outerArrowFunctionTypeParameterDeclaration = t.tsTypeParameterDeclaration([
  t.tsTypeParameter(
    null,
    t.tsTypeReference(t.identifier('QueryPoolsResponse')),
    'TData',
  ),
])

const outerArrowFunction = t.arrowFunctionExpression(
  [
    objectPattern
  ],
  t.blockStatement([
    t.returnStatement(
      callExperssion
    ),
  ]),
  false
)

outerArrowFunction.typeParameters = outerArrowFunctionTypeParameterDeclaration
outerArrowFunction.generator = false

// Creating the usePools variable declaration
const usePoolsVariableDeclaration = t.variableDeclaration('const', [
  t.variableDeclarator(
    t.identifier('usePools'),
    outerArrowFunction
  ),
]);


export const astCodeSnippet = t.file(t.program(
  [
     t.exportNamedDeclaration(usePoolsQueryInterface, []),
     usePoolsVariableDeclaration
  ]
))