// Functions that returns a Promise:
//   Function that simulates an API call, Promise written
const start = new Date().valueOf();

function fake_api(call_number:number) : Promise<string>{
	const call_time = Math.floor((new Date().valueOf()-start))
	return new Promise((resolve,reject)=>{
		const time = Math.floor(Math.random()*5000);
		setTimeout(() => {
			if (time > 2500)
				reject(`[${call_number}]	|[${call_time}]${(()=>call_time > 10000 ? '\t' : '\t\t')()}|[Rejected]	|[${time}]		|Promise`);
			resolve(`[${call_number}]	|[${call_time}]${(()=>call_time > 10000 ? '\t' : '\t\t')()}|[Resolved]	|[${time}]		|Promise`);
		}, time);
	})
}
//   Function that simulates an API call, async written (it is possible to return the promise as well)
async function fake_async_api(call_number:number) : Promise<any>{
	const time = Math.floor(Math.random()*5000);
	const call_time = Math.floor((new Date().valueOf()-start))
	return await new Promise((resolve,reject)=>setTimeout(() => {
		if (time > 2500)
			reject(`[${call_number}]	|[${call_time}]${(()=>call_time > 10000 ? '\t' : '\t\t')()}|[Rejected]	|[${time}]		|Async`);
		resolve(`[${call_number}]	|[${call_time}]${(()=>call_time > 10000 ? '\t' : '\t\t')()}|[Resolved]	|[${time}]		|Async`);
	}, time))
}

//Wrappers that enforce the fake API to always resolve (needed when using Promise.all())
async function fake_api_wrapper(call_number:number){
	try{
		const result = await fake_api(call_number);
		return(result)
	}catch(e){
		return(e);
	}
}
async function fake_async_api_wrapper(call_number:number){
	try{
		const result = await fake_async_api(call_number);
		return(result)
	}catch(e){
		return(e);
	}
}

async function blocking_call_api(){
	console.log('started to call blocking fake api')
	console.log('Call	|Start		|Status		|Time Spent	|Kind');
	const pre_loop = Math.floor(new Date().valueOf());
	for(let i = 1; i < 11; i++){
		try{
			if (Math.floor(i % 2))
			console.log(await fake_async_api(i))
			else
			console.log(await fake_api(i))
		}catch(e){
			console.log(e);
		}
	}
	console.log(`Total Time spent ${Math.floor(Math.floor(new Date().valueOf()) - pre_loop)}ms`)
	return (true);
}
async function non_blocking_call_api(){
	console.log('started to call non blocking fake api')
	console.log('Call	|Start		|Status		|Time Spent	|Kind');
	const pre_loop = Math.floor(new Date().valueOf());
	try{
		const promises_vector : Array<Promise<any>> = []
		for(let i = 1; i < 11; i++){
			if (Math.floor(i % 2))
			promises_vector.push(fake_async_api(i))
			//promises_vector.push(fake_async_api_wrapper(i))
			else
			promises_vector.push(fake_api(i))
			//promises_vector.push(fake_api_wrapper(i))
		}
		const result = await Promise.allSettled(promises_vector) as Array<{status:'fulfilled',value:any} | {status:'rejected',reason:string}>;
		result.forEach((e)=>{
			if (e.status === 'fulfilled')
			console.log(e.value)
			else
			console.log(e.reason)
		});
		console.log(`Total Time spent ${Math.floor(Math.floor(new Date().valueOf()) - pre_loop)}ms`)
	}catch(e)
	{
		console.log(e);
		console.log('deu ruim, aborte!')
		return false
	}
	return (true);
}

//blocking_call_api().then(e=>console.log(`Resultado ${e}`)).catch(e=>console.log('deu ruim'))
//non_blocking_call_api().then(e=>console.log(`Resultado ${e}`)).catch(e=>console.log('deu ruim'))
async function call_both(){
	await blocking_call_api();
	await non_blocking_call_api();
}

call_both();