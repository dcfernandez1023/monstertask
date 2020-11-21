export const subTask = {
	name: "",
	userCompleted: "",
	dateCreated: "",
	dateCompleted: "",
	deadline: "",
	description: ""
};

export const subTaskFields = {
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
		}
	]
};
