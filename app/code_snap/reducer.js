import { TeamAction } from "../actions/teamActions";

const initialState = { isTeamRegistered: false, team: {}, searchResults: null, pages: {} };

const teamReducer = (state = initialState, action) => {
    const { type, payload } = action;
    const newState = { ...state };
    let member;

    switch (type) {
        case TeamAction.GetTeam:
            return {
                ...state,
                ...payload,
            };
        case TeamAction.TeamCreateSuccess:
            member = payload.member;
            newState.team[member.email] = member;
            return {
                ...state,
                ...newState,
            };
        case TeamAction.TeamCreateFailed:
            return {
                ...state,
            };
        case TeamAction.UpdateTeamMember:
            if (payload.isTeamUpdated) {
                member = payload.member;
                newState.team[member.email] = member;
                return {
                    ...state,
                    ...newState,
                };
            }
            return state;
        case TeamAction.GetTeamMember:
            if (payload.memberExists) {
                member = payload.member;
                newState.team[member.email] = member;
                return {
                    ...state,
                    ...newState,
                };
            }
            return state;
        case TeamAction.SearchUser:
            if (payload.searchSuccess) {
                newState.searchResults = payload.searchResults;
                return {
                    ...state,
                    ...newState,
                };
            }
            return state;
        default:
            return state;
    }
};

export default teamReducer;
