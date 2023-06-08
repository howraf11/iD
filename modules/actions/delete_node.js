import { actionDeleteRelation } from './delete_relation';
import { actionDeleteWay } from './delete_way';
import { sendActivity } from '../activities';


// https://github.com/openstreetmap/potlatch2/blob/master/net/systemeD/halcyon/connection/actions/DeleteNodeAction.as
export function actionDeleteNode(nodeId) {
    var action = function(graph) {
        var node = graph.entity(nodeId);

        graph.parentWays(node)
            .forEach(function(parent) {
                parent = parent.removeNode(nodeId);
                graph = graph.replace(parent);

                if (parent.isDegenerate()) {
                    graph = actionDeleteWay(parent.id)(graph);
                }
            });

        graph.parentRelations(node)
            .forEach(function(parent) {
                parent = parent.removeMembersWithID(nodeId);
                graph = graph.replace(parent);

                if (parent.isDegenerate()) {
                    graph = actionDeleteRelation(parent.id)(graph);
                }
            });

        sendActivity('removeNodes', { 'nodes': [nodeId] });

        return graph.remove(node);
    };


    return action;
}
