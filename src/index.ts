import * as t from '@babel/types';
import generate from '@babel/generator';

const QUERY_INTERFANCE = 'UsePoolsQuery'
const HOOK_NAME = "usePools"
const REQUEST_TYPE = "QueryPoolsRequest"
const RESPONSE_TYPE = "QueryPoolsResponse"
const QUERY_SERVICE_METHOD_NAME = "pools"

const optionalProperty = t.tsPropertySignature(
    t.identifier('request'),
    t.tsTypeAnnotation(t.tsTypeReference(t.identifier(REQUEST_TYPE)))
)
optionalProperty.optional = true;

// Creating the UsePoolsQuery interface declaration
const usePoolsQueryInterface = t.tsInterfaceDeclaration(
  t.identifier(QUERY_INTERFANCE),
  t.tsTypeParameterDeclaration([
    t.tsTypeParameter(null, null, 'TData'),
  ]),
  [t.tsExpressionWithTypeArguments(
      t.identifier('ReactQueryParams'),
      t.tsTypeParameterInstantiation([
          t.tsTypeReference(t.identifier(RESPONSE_TYPE)),
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
  t.identifier(QUERY_INTERFANCE),
  t.tsTypeParameterInstantiation([
    t.tsTypeReference(t.identifier('TData')),
  ]),
))

objectPattern.typeAnnotation = typeAnnotation;

const callExperssionTypeParameter = t.tsTypeParameterInstantiation([
  t.tsTypeReference(t.identifier(RESPONSE_TYPE)),
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
              t.identifier(QUERY_SERVICE_METHOD_NAME),
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
    t.tsTypeReference(t.identifier(RESPONSE_TYPE)),
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
    t.identifier(HOOK_NAME),
    outerArrowFunction
  ),
]);


export const astCodeSnippet = t.file(t.program(
  [
     t.exportNamedDeclaration(usePoolsQueryInterface, []),
     usePoolsVariableDeclaration
  ]
))

/**
 * deliverable 2
 * createQueryScript
 * @param QUERY_INTERFANCE 
 * @param HOOK_NAME 
 * @param REQUEST_TYPE 
 * @param RESPONSE_TYPE 
 * @param QUERY_SERVICE_METHOD_NAME 
 * @returns 
 */

export const createQueryScript = (
  QUERY_INTERFANCE = 'UsePoolsQuery',
  HOOK_NAME = "usePools",
  REQUEST_TYPE = "QueryPoolsRequest",
  RESPONSE_TYPE = "QueryPoolsResponse", 
  QUERY_SERVICE_METHOD_NAME = "pools"
)=>{
  const optionalProperty = t.tsPropertySignature(
      t.identifier('request'),
      t.tsTypeAnnotation(t.tsTypeReference(t.identifier(REQUEST_TYPE)))
  )
  optionalProperty.optional = true;

  // Creating the UsePoolsQuery interface declaration
  const usePoolsQueryInterface = t.tsInterfaceDeclaration(
    t.identifier(QUERY_INTERFANCE),
    t.tsTypeParameterDeclaration([
      t.tsTypeParameter(null, null, 'TData'),
    ]),
    [t.tsExpressionWithTypeArguments(
        t.identifier('ReactQueryParams'),
        t.tsTypeParameterInstantiation([
            t.tsTypeReference(t.identifier(RESPONSE_TYPE)),
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
    t.identifier(QUERY_INTERFANCE),
    t.tsTypeParameterInstantiation([
      t.tsTypeReference(t.identifier('TData')),
    ]),
  ))

  objectPattern.typeAnnotation = typeAnnotation;

  const callExperssionTypeParameter = t.tsTypeParameterInstantiation([
    t.tsTypeReference(t.identifier(RESPONSE_TYPE)),
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
                t.identifier(QUERY_SERVICE_METHOD_NAME),
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
      t.tsTypeReference(t.identifier(RESPONSE_TYPE)),
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
      t.identifier(HOOK_NAME),
      outerArrowFunction
    ),
  ]);

  return t.file(t.program(
    [
       t.exportNamedDeclaration(usePoolsQueryInterface, []),
       usePoolsVariableDeclaration
    ]
  ))
}
