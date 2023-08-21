import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('/notify/*', cors());


app.post('/notify/create', async c => {
	const { email } = await c.req.json()

	if (!email) return c.text("Missing email")

	const { success } = await c.env.DB.prepare(`
	  insert into notify (email) values (?)
	`).bind(email).run()

	if (success) {
		c.status(201)
		return c.text("Created")
	} else {
		c.status(500)
		return c.text("Something went wrong")
	}
})

app.notFound(c => c.text('Not found', 404));

export default app;