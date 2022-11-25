"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Functions that returns a Promise:
//   Function that simulates an API call, Promise written
const start = new Date().valueOf();
function fake_api(call_number) {
    const call_time = Math.floor((new Date().valueOf() - start));
    return new Promise((resolve, reject) => {
        const time = Math.floor(Math.random() * 5000);
        setTimeout(() => {
            if (time > 2500)
                reject(`[${call_number}]	|[${call_time}]${(() => call_time > 10000 ? '\t' : '\t\t')()}|[Rejected]	|[${time}]		|Promise`);
            resolve(`[${call_number}]	|[${call_time}]${(() => call_time > 10000 ? '\t' : '\t\t')()}|[Resolved]	|[${time}]		|Promise`);
        }, time);
    });
}
//   Function that simulates an API call, async written (it is possible to return the promise as well)
function fake_async_api(call_number) {
    return __awaiter(this, void 0, void 0, function* () {
        const time = Math.floor(Math.random() * 5000);
        const call_time = Math.floor((new Date().valueOf() - start));
        return yield new Promise((resolve, reject) => setTimeout(() => {
            if (time > 2500)
                reject(`[${call_number}]	|[${call_time}]${(() => call_time > 10000 ? '\t' : '\t\t')()}|[Rejected]	|[${time}]		|Async`);
            resolve(`[${call_number}]	|[${call_time}]${(() => call_time > 10000 ? '\t' : '\t\t')()}|[Resolved]	|[${time}]		|Async`);
        }, time));
    });
}
//Wrappers that enforce the fake API to always resolve (needed when using Promise.all())
function fake_api_wrapper(call_number) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield fake_api(call_number);
            return (result);
        }
        catch (e) {
            return (e);
        }
    });
}
function fake_async_api_wrapper(call_number) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield fake_async_api(call_number);
            return (result);
        }
        catch (e) {
            return (e);
        }
    });
}
function blocking_call_api() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('started to call blocking fake api');
        console.log('Call	|Start		|Status		|Time Spent	|Kind');
        for (let i = 1; i < 11; i++) {
            try {
                if (Math.floor(i % 2))
                    console.log(yield fake_async_api(i));
                else
                    console.log(yield fake_api(i));
            }
            catch (e) {
                console.log(e);
            }
        }
        return (true);
    });
}
function non_blocking_call_api() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('started to call non blocking fake api');
        console.log('Call	|Start		|Status		|Time Spent	|Kind');
        try {
            const promises_vector = [];
            for (let i = 1; i < 11; i++) {
                if (Math.floor(i % 2))
                    promises_vector.push(fake_async_api(i));
                //promises_vector.push(fake_async_api_wrapper(i))
                else
                    promises_vector.push(fake_api(i));
                //promises_vector.push(fake_api_wrapper(i))
            }
            const result = yield Promise.allSettled(promises_vector);
            result.forEach((e) => {
                if (e.status === 'fulfilled')
                    console.log(e.value);
                else
                    console.log(e.reason);
            });
        }
        catch (e) {
            console.log(e);
            console.log('deu ruim, aborte!');
            return false;
        }
        return (true);
    });
}
blocking_call_api().then(e => console.log(`Resultado ${e}`)).catch(e => console.log('deu ruim'));
//non_blocking_call_api().then(e=>console.log(`Resultado ${e}`)).catch(e=>console.log('deu ruim'))
//# sourceMappingURL=index.js.map