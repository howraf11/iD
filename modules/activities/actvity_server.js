import { json as d3_json } from 'd3-fetch';

const POST_URL = 'http://localhost:8282/mapedit/log';

export async function sendActivity(action, activity) {
    try {
        const value = {
          'action': action,
          'created': new Date().getTime()
        };

        if (activity.wayID) {
          value.wayID = activity.wayID;
        }

        if (activity.point) {
          value.pointX = activity.point[0];
          value.pointY = activity.point[1];
        }

        if (activity.nodes) {
          value.nodes = activity.nodes;
        }

      if (activity.map) {
        value.mapLocation = activity.map;
      }

        await d3_json(POST_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value)
        });
    } catch (e) {
        console.log(`Could not post the activity: ${JSON.stringify(e)} ${JSON.stringify(activity)}`);
    }
}
