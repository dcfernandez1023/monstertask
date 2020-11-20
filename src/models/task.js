export const task = {
	name: "",
	taskId: "",
	parentId: "",
	userCreated: "",
	dateCreated: "",
	dateCompleted: "",
	deadline: "",
	subTasks: [],
	percentageCompleted: 0,
	description: "",
	lastUpdated: ""
};

export const taskFields = {
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
			value: "subTasks",
			displayName: "Sub-tasks",
			isEditable: false 
		},
		{
			value: "percentageCompleted",
			displayName: "Percentage Completed",
			isEditable: false
		},
		{
			value: "lastUpdated",
			displayName: "Last Updated",
			isEditable: false
		}
	]
};
