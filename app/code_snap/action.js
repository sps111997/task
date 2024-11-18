import OrgService from "@/services/org.service";
import _ from "lodash";

export const TeamAction = {
    TeamCreateSuccess: "CREATE_TEAM_SUCCESS",
    TeamCreateFailed: "CREATE_TEAM_FAILED",
    CreateTeamMember: "CREATE_TEAM_MEMBER",
    GetTeam: "GET_TEAM",
    GetTeamMember: "GET_TEAM_MEMBER",
    UpdateTeamMember: "UPDATE_TEAM_MEMBER",
};
export const createTeamMember = (orgId, formData, dispatch) => {
    return new Promise((resolve, reject) => {
        OrgService.createTeamMember(orgId, formData)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};

export const getTeamMember = (orgId, memberId, dispatch) => {
    return new Promise((resolve, reject) => {
        OrgService.getTeamMember(orgId, memberId)
            .then((res) => {
                dispatch({
                    type: TeamAction.GetTeamMember,
                    payload: { memberExists: true, member: res.data },
                });
                resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: TeamAction.GetTeamMember,
                    payload: { memberExists: false, member: null },
                });
                reject(err);
            });
    });
};

export const getTeam = (orgId, userId, page, pageSize, dispatch) => {
    return new Promise((resolve, reject) => {
        OrgService.getTeam(orgId, userId, page, pageSize)
            .then((res) => {
                const team = {};
                res.data.team.forEach((member) => {
                    team[member.email] = member;
                });
                dispatch({
                    type: TeamAction.GetTeam,
                    payload: { team, pages: res.data.pages },
                });
                resolve(res);
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: TeamAction.GetTeam,
                    payload: { team: null },
                });
                reject(err);
            });
    });
};

export const updateTeam = (orgId, memberId, formData, dispatch) => {
    return new Promise((resolve, reject) => {
        OrgService.updateTeamMember(orgId, memberId, formData)
            .then((res) => {
                // dispatch({
                //     type: TeamAction.UpdateTeamMember,
                //     payload: {isTeamUpdated: true, member: res.data}
                // });
                resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                // dispatch({
                //     type: TeamAction.UpdateTeamMember,
                //     payload: {isTeamUpdated: false, member: null}
                // });
                reject(err);
            });
    });
};
