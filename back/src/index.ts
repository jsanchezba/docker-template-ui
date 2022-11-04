import express from 'express'
import util from 'node:util'
import { exec } from 'child_process'

const app = express()
const execP = util.promisify(exec)


app.get('/api/clone', async function(request, response) {
    
    const { stdout, stderr } = await execP(`
        docker run \
        --env MARIADB_ROOT_PASSWORD=123 \
        --publish 3306 \
        --label myTemplate \
        --detach \
        mariadb:latest
    `);

    //        --name testcontainer \
    // --env MARIADB_USER=root \
    // --env MARIADB_PASSWORD=123 \
    console.log(stdout)
    

    response.json([])
})


app.get('/api/list', async function(request, response) {
    const { stdout, stderr } = await execP(`docker ps -a --filter label=myTemplate --format '{"id":"{{ .ID }}", "image": "{{ .Image }}", "name":"{{ .Names }}", "ports": "{{ .Ports }}", "status": "{{ .Status }}", "labels": "{{ .Labels }}"}' `);
    
    const rows = stdout.split('\n')

    interface Instance {
        id: string
        name: string
    }
    const instances: Instance[] = []
    for (const row of rows) {
        if (row === '') continue

        instances.push(JSON.parse(row))
    }
    // for (const out of stdout)
    //     console.log(out)
    
    response.json(instances)
})


app.listen(3000, () => {
    console.log('API started!')
})