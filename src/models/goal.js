export const goal = {
	name: "",
	goalId: "",
	userCreated: "",
	dateCreated: "",
	dateCompleted: "",
	deadline: "",
	tasks: [],
	percentageCompleted: 0,
	description: "",
	sharedWith: [],
	chatRoomMessages: [],
	lastUpdated: ""
}
export const goalFields = {
	editableFields: [
		{
			value: "name",
			displayName: "Name",
			isEditable: true
		},
		{
			value: "description",
			displayName: "Description",
			isEditable: true
		},
		{
			value: "deadline",
			displayName: "Deadline",
			isEditable: true
		}
	],
	allFields: [
		{
			value: "name",
			displayName: "Name",
			isEditable: true
		},
		{
			value: "description",
			displayName: "Description",
			isEditable: true
		},
		{
			value: "deadline",
			displayName: "Deadline",
			isEditable: true
		},
		{
			value: "goalId",
			displayName: "Goal Id",
			isEditable: false
		},
		{
			value: "userCreated",
			displayName: "User Created",
			isEditable: false
		},
		{
			value: "dateCreated",
			displayName: "Date Created",
			isEditable: false
		},
		{
			value: "dateCompleted",
			displayName: "Date Completed",
			isEditable: false
		},
		{
			value: "tasks",
			displayName: "Tasks",
			isEditable: false
		},
		{
			value: "percentageCompleted",
			displayName: "Percentage Completed",
			isEditable: false
		},
		{
			value: "sharedWith",
			displayName: "Shared With",
			isEditable: false
		},
		{
			value: "chatRoomMessages",
			displayName: "Chat Room Messages",
			isEditable: false
		}
	]
};