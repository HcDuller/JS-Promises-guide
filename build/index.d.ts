declare const start: number;
declare function fake_api(call_number: number): Promise<string>;
declare function fake_async_api(call_number: number): Promise<any>;
declare function fake_api_wrapper(call_number: number): Promise<unknown>;
declare function fake_async_api_wrapper(call_number: number): Promise<any>;
declare function blocking_call_api(): Promise<boolean>;
declare function non_blocking_call_api(): Promise<boolean>;
declare function call_both(): Promise<void>;
//# sourceMappingURL=index.d.ts.map