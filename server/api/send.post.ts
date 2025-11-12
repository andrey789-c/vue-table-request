export default defineEventHandler(async (event) => {
	console.log(event)

  const body = await readBody(event);

  console.log('Body:', body);

  return {
    success: true
  }
});
