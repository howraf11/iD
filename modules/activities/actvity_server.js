import { json as d3_json } from 'd3-fetch';

const POST_URL = "http://localhost:8282/mapedit/log";

export async function sendActivity(action, activity) {
    try {
        d3_json(POST_URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              "action": action,
              "pointX": activity[0],
              "pointY": activity[1],
              "created": new Date().getTime()
            })
        });
    } catch (e) {
        console.log(`Could not post the activity: ${JSON.stringify(e)} ${JSON.stringify(m)}`);
    }
}
