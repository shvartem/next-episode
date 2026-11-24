import {app} from './app.ts';
import {log} from './log.ts';

const port = Number(process.env.PORT ?? 3001);

app.listen(port, (error) => {
    if (error) {
        throw error;
    }

    log('INFO', 'API', `Shows API listening on port ${port}`);
});
