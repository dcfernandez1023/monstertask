export const goal = {
	name: "New Goal",
	goalId: "",
	userCreated: "",
	dateCreated: "",
	dateCompleted: "",
	deadline: "",
	tasks: [],
	percentageCompleted: 0,
	description: "",
	sharedWith: [],
	editableFields: [
		{
			value: "name",
			displayName: "Name",
			isEditable: true
		},
		{
			value: "deadline",
			displayName: "Deadline",
			isEditable: true
		},
		{
			value: "description",
			displayName: "Description",
			isEditable: true
		}
	],
	fields: [
		{
			value: "name",
			displayName: "Name",
			isEditable: true
		},
		{
			value: "deadline",
			displayName: "Deadline",
			isEditable: true
		},
		{
			value: "description",
			displayName: "Description",
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
		}
	]
};