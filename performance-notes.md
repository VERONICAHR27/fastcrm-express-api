# Performance Notes: Mejoras en la búsqueda de plantillas

## Índice creado
Se creó un índice en el campo `content` para mejorar la velocidad de búsqueda frecuente.

### Comando para crear el índice
Resultados de explain: {
  explainVersion: '1',
  queryPlanner: {
    namespace: 'test.templates',
    parsedQuery: { type: [Object] },
    indexFilterSet: false,
    queryHash: '037D683F',
    planCacheShapeHash: '037D683F',
    planCacheKey: '9555AB13',
    optimizationTimeMillis: 0,
    maxIndexedOrSolutionsReached: false,
    maxIndexedAndSolutionsReached: false,
    maxScansToExplodeReached: false,
    prunedSimilarIndexes: false,
    winningPlan: {
      isCached: false,
      stage: 'COLLSCAN',
      filter: [Object],
      direction: 'forward'
    },
    rejectedPlans: []
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 5,
    executionTimeMillis: 0,
    totalKeysExamined: 0,
    totalDocsExamined: 12,
    executionStages: {
      isCached: false,
      stage: 'COLLSCAN',
      filter: [Object],
      nReturned: 5,
      executionTimeMillisEstimate: 0,
      works: 13,
      advanced: 5,
      needTime: 7,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      direction: 'forward',
      docsExamined: 12
    },
    allPlansExecution: []
  },
  queryShapeHash: '8286ABC1ADB3F33EEC70C59CF736C08BC6554E9C2D7D3340FA50FF7F5F9BF898',
  command: { find: 'templates', filter: { type: 'Welcome' }, '$db': 'test' },
  serverInfo: {
    host: 'ac-jajus8f-shard-00-01.x9jxzq3.mongodb.net',
    port: 27017,
    version: '8.0.6',
    gitVersion: '80f21521ad4a3dfd5613f5d649d7058c6d46277f'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,
    internalQueryFacetMaxOutputDocSizeBytes: 104857600,
    internalLookupStageIntermediateDocumentMaxSizeBytes: 16793600,      
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 33554432,
    internalQueryProhibitBlockingMergeOnMongoS: 0,
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,     
    internalQueryFrameworkControl: 'trySbeRestricted',
    internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
  },
  ok: 1,
  '$clusterTime': {
    clusterTime: new Timestamp({ t: 1744258109, i: 1 }),
    signature: {
      hash: Binary.createFromBase64('ziSO3X+wCr/as8orT0RrAxbPLt4=', 0), 
      keyId: new Long('7489578698207657990')
    }
  },
  operationTime: new Timestamp({ t: 1744258109, i: 1 })
}