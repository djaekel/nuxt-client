export const actions = {
	async getResources({ commit }, payload = {}) {
		commit("setLoading", true);
		const query = Object.assign({ $limit: 9 }, payload || {});
		const res = await this.$axios.$get("/edusharing/search", {
			params: query,
		});
		commit("setResources", res);
		commit("setLoading", false);
	},
	async addResources({ commit }, payload = {}) {
		commit("setLoading", true);
		const query = payload || {};
		const res = await this.$axios.$get("/edusharing/search", {
			params: query,
		});
		commit("addResources", res);
		commit("setLoading", false);
	},
};

export const mutations = {
	setResources(state, payload) {
		state.resources = {
			data: payload.nodes,
			limit: payload.pagination.count,
			skip: payload.pagination.from,
			total: payload.pagination.total,
		};
	},
	addResources(state, payload) {
		payload.data.forEach((resource) => state.resources.data.push(resource));
		state.resources = {
			...state.resources,
			limit: payload.limit,
			skip: payload.skip,
			total: payload.pagination.total,
		};
	},
	setLoading(state, type) {
		state.loading = type;
	},
};

export const state = () => ({
	resources: {
		data: [],
		limit: null,
		skip: null,
		total: null,
	},
	loading: false,
});
