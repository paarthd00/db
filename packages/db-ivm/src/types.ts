import type { MultiSet, MultiSetArray } from "./multiset.js"
import type {
  BinaryOperator,
  DifferenceStreamReader,
  DifferenceStreamWriter,
  UnaryOperator,
} from "./graph.js"

export type KeyValue<K, V> = [K, V]

export interface IOperator<_T> {
  run: () => void
  hasPendingWork: () => boolean
}

export interface IDifferenceStreamReader<T> {
  drain: () => Array<MultiSet<T>>
  isEmpty: () => boolean
}

export interface IDifferenceStreamWriter<T> {
  sendData: (collection: MultiSet<T> | MultiSetArray<T>) => void
  newReader: () => IDifferenceStreamReader<T>
}

export interface ID2 {
  getNextOperatorId: () => number
  newInput: <T>() => IStreamBuilder<T>
  addOperator: (operator: UnaryOperator<any> | BinaryOperator<any>) => void
  addStream: (stream: DifferenceStreamReader<any>) => void
  finalize: () => void
  step: () => void
}

export interface IStreamBuilder<T> {
  writer: DifferenceStreamWriter<T>
  connectReader: () => DifferenceStreamReader<T>
  graph: ID2

  // Don't judge, this is the only way to type this function.
  // rxjs has very similar code to type its pipe function
  // https://github.com/ReactiveX/rxjs/blob/master/packages/rxjs/src/internal/util/pipe.ts
  // We go to 20 operators deep, because surly that's enough for anyone...
  // A user can always split the pipe into multiple pipes to get around this.
  pipe: (<O>(o1: PipedOperator<T, O>) => IStreamBuilder<O>) &
    (<T2, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, O>
    ) => IStreamBuilder<O>) &
    (<T2, T3, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, O>
    ) => IStreamBuilder<O>) &
    (<T2, T3, T4, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, O>
    ) => IStreamBuilder<O>) &
    (<T2, T3, T4, T5, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, O>
    ) => IStreamBuilder<O>) &
    (<T2, T3, T4, T5, T6, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, O>
    ) => IStreamBuilder<O>) &
    (<T2, T3, T4, T5, T6, T7, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, T7>,
      o7: PipedOperator<T7, O>
    ) => IStreamBuilder<O>) &
    (<T2, T3, T4, T5, T6, T7, T8, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, T7>,
      o7: PipedOperator<T7, T8>,
      o8: PipedOperator<T8, O>
    ) => IStreamBuilder<O>) &
    (<T2, T3, T4, T5, T6, T7, T8, T9, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, T7>,
      o7: PipedOperator<T7, T8>,
      o8: PipedOperator<T8, T9>,
      o9: PipedOperator<T9, O>
    ) => IStreamBuilder<O>) &
    (<T2, T3, T4, T5, T6, T7, T8, T9, T10, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, T7>,
      o7: PipedOperator<T7, T8>,
      o8: PipedOperator<T8, T9>,
      o9: PipedOperator<T9, T10>,
      o10: PipedOperator<T10, O>
    ) => IStreamBuilder<O>) &
    (<T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, T7>,
      o7: PipedOperator<T7, T8>,
      o8: PipedOperator<T8, T9>,
      o9: PipedOperator<T9, T10>,
      o10: PipedOperator<T10, T11>,
      o11: PipedOperator<T11, O>
    ) => IStreamBuilder<O>) &
    (<T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, T7>,
      o7: PipedOperator<T7, T8>,
      o8: PipedOperator<T8, T9>,
      o9: PipedOperator<T9, T10>,
      o10: PipedOperator<T10, T11>,
      o11: PipedOperator<T11, T12>,
      o12: PipedOperator<T12, O>
    ) => IStreamBuilder<O>) &
    (<T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, T7>,
      o7: PipedOperator<T7, T8>,
      o8: PipedOperator<T8, T9>,
      o9: PipedOperator<T9, T10>,
      o10: PipedOperator<T10, T11>,
      o11: PipedOperator<T11, T12>,
      o12: PipedOperator<T12, T13>,
      o13: PipedOperator<T13, O>
    ) => IStreamBuilder<O>) &
    (<T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, T7>,
      o7: PipedOperator<T7, T8>,
      o8: PipedOperator<T8, T9>,
      o9: PipedOperator<T9, T10>,
      o10: PipedOperator<T10, T11>,
      o11: PipedOperator<T11, T12>,
      o12: PipedOperator<T12, T13>,
      o13: PipedOperator<T13, T14>,
      o14: PipedOperator<T14, O>
    ) => IStreamBuilder<O>) &
    (<T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, T7>,
      o7: PipedOperator<T7, T8>,
      o8: PipedOperator<T8, T9>,
      o9: PipedOperator<T9, T10>,
      o10: PipedOperator<T10, T11>,
      o11: PipedOperator<T11, T12>,
      o12: PipedOperator<T12, T13>,
      o13: PipedOperator<T13, T14>,
      o14: PipedOperator<T14, T15>,
      o15: PipedOperator<T15, O>
    ) => IStreamBuilder<O>) &
    (<T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, O>(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, T7>,
      o7: PipedOperator<T7, T8>,
      o8: PipedOperator<T8, T9>,
      o9: PipedOperator<T9, T10>,
      o10: PipedOperator<T10, T11>,
      o11: PipedOperator<T11, T12>,
      o12: PipedOperator<T12, T13>,
      o13: PipedOperator<T13, T14>,
      o14: PipedOperator<T14, T15>,
      o15: PipedOperator<T15, T16>,
      o16: PipedOperator<T16, O>
    ) => IStreamBuilder<O>) &
    (<
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      O,
    >(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, T7>,
      o7: PipedOperator<T7, T8>,
      o8: PipedOperator<T8, T9>,
      o9: PipedOperator<T9, T10>,
      o10: PipedOperator<T10, T11>,
      o11: PipedOperator<T11, T12>,
      o12: PipedOperator<T12, T13>,
      o13: PipedOperator<T13, T14>,
      o14: PipedOperator<T14, T15>,
      o15: PipedOperator<T15, T16>,
      o16: PipedOperator<T16, T17>,
      o17: PipedOperator<T17, O>
    ) => IStreamBuilder<O>) &
    (<
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      O,
    >(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, T7>,
      o7: PipedOperator<T7, T8>,
      o8: PipedOperator<T8, T9>,
      o9: PipedOperator<T9, T10>,
      o10: PipedOperator<T10, T11>,
      o11: PipedOperator<T11, T12>,
      o12: PipedOperator<T12, T13>,
      o13: PipedOperator<T13, T14>,
      o14: PipedOperator<T14, T15>,
      o15: PipedOperator<T15, T16>,
      o16: PipedOperator<T16, T17>,
      o17: PipedOperator<T17, T18>,
      o18: PipedOperator<T18, O>
    ) => IStreamBuilder<O>) &
    (<
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
      O,
    >(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, T7>,
      o7: PipedOperator<T7, T8>,
      o8: PipedOperator<T8, T9>,
      o9: PipedOperator<T9, T10>,
      o10: PipedOperator<T10, T11>,
      o11: PipedOperator<T11, T12>,
      o12: PipedOperator<T12, T13>,
      o13: PipedOperator<T13, T14>,
      o14: PipedOperator<T14, T15>,
      o15: PipedOperator<T15, T16>,
      o16: PipedOperator<T16, T17>,
      o17: PipedOperator<T17, T18>,
      o18: PipedOperator<T18, T19>,
      o19: PipedOperator<T19, O>
    ) => IStreamBuilder<O>) &
    (<
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16,
      T17,
      T18,
      T19,
      T20,
      O,
    >(
      o1: PipedOperator<T, T2>,
      o2: PipedOperator<T2, T3>,
      o3: PipedOperator<T3, T4>,
      o4: PipedOperator<T4, T5>,
      o5: PipedOperator<T5, T6>,
      o6: PipedOperator<T6, T7>,
      o7: PipedOperator<T7, T8>,
      o8: PipedOperator<T8, T9>,
      o9: PipedOperator<T9, T10>,
      o10: PipedOperator<T10, T11>,
      o11: PipedOperator<T11, T12>,
      o12: PipedOperator<T12, T13>,
      o13: PipedOperator<T13, T14>,
      o14: PipedOperator<T14, T15>,
      o15: PipedOperator<T15, T16>,
      o16: PipedOperator<T16, T17>,
      o17: PipedOperator<T17, T18>,
      o18: PipedOperator<T18, T19>,
      o19: PipedOperator<T19, T20>,
      o20: PipedOperator<T20, O>
    ) => IStreamBuilder<O>) &
    (<O>(...operators: Array<PipedOperator<any, any>>) => IStreamBuilder<O>)
}

export type PipedOperator<I, O> = (
  stream: IStreamBuilder<I>
) => IStreamBuilder<O>
