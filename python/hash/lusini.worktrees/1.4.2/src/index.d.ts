/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path='../cypress/support/index.d.ts'/>

declare module 'redux-ruleset' {
  type EventDesc =
    | '#url-hash'
    | '#cancel'
    | '#dl-event'
    | '#navigate'
    | '#partial-mount'
    | '#prefetch-resolve'
    | '#listener'
    | '#set-customer-type'
    | '#script-add'
    | '#script-remove'
    | '#dy-event'

  type AT<Action> = Action extends { type: infer T } ? T : never
  type DispatchEvent = ValueOf<RulesetDispatchEvents>
  type A<AT> = Extract<RootAction | DispatchEvent, { type: AT }>

  type ActionTypes = AT<RootAction>
  type DispatchTypes = AT<DispatchEvent>

  type Saga<R> = (
    next: <AT extends ActionTypes | DispatchTypes>(
      action: '*' | AT | AT[],
      cb?: (action: A<AT>) => any
    ) => IteratorResult<any>,
    opt: {
      context: Context
      getState: () => RootState
    }
  ) => Generator<any, R, any>

  interface Context {
    get: (key: string) => any
    set: (key: string, val: any) => void
  }

  interface Rule<AT, OUT> {
    id: string
    target: '*' | AT | AT[]
    output: OUT | OUT[]
    position?: 'BEFORE' | 'AFTER' | 'INSTEAD'
    addUntil?: Saga<
      | 'REMOVE_RULE'
      | 'REMOVE_RULE_BEFORE'
      | 'RECREATE_RULE'
      | 'RECREATE_RULE_BEFORE'
      | 'REAPPLY_ADD_UNTIL'
    >
    addWhen?: Saga<
      'ADD_RULE' | 'ADD_RULE_BEFORE' | 'ABORT' | 'REAPPLY_ADD_WHEN'
    >
    weight?: number
    addOnce?: boolean
    onExecute?: 'RECREATE_RULE' | 'REMOVE_RULE'
    concurrency?: 'FIRST' | 'LAST' | 'ONCE' | 'SWITCH'
    concurrencyFilter?: (action: A<AT>) => string
    throttle?: number
    debounce?: number
    delay?: number
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    condition?: <O extends A<OUT> = A<OUT>>(
      action: A<AT>,
      opt: {
        getState: () => RootState
        context: Context
      }
    ) => boolean
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    consequence: <O extends A<OUT> = A<OUT>>(
      action: A<AT>,
      opt: {
        getState: () => RootState
        dispatch: (action: A<OUT>) => void
        context: Context
        addRule: (name: string, ...args: any[]) => void
        removeRule: (name: string) => void
        effect: (cb: () => void) => void
      }
    ) =>
      | void
      | A<OUT>
      | Promise<A<OUT> | null>
      | null
      | Promise<void>
      | Promise<null>
      | (() => void)
    subRules?: Record<string, any>
  }
  // const addRule: <A>(rule:any)=>any;
  const addRule: <
    AT extends ActionTypes | DispatchTypes,
    OUT extends ActionTypes | DispatchTypes | EventDesc
  >(
    rule: Rule<AT, OUT>
  ) => Rule<AT, OUT>
  const dispatchEvent: <Action>(action: Action) => Action
  const skipRule: <Action>(id: string[] | string, action: Action) => Action
  const middleware: any
  const removeRule: (rule: Rule<any, any>) => void
  export { addRule, dispatchEvent, skipRule, removeRule }
  export default middleware
}

declare global {
  type cy = any
}

declare module '*.svg' {
  const result: any
  export default result
}
