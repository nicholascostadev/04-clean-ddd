import { faker } from "@faker-js/faker";

import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
	Question,
	type QuestionProps,
} from "@/domain/forum/enterprise/entities/question";

export function makeQuestion(
	override?: Partial<QuestionProps>,
	id?: UniqueEntityId,
) {
	const question = Question.create(
		{
			title: faker.lorem.sentence(),
			content: faker.lorem.text(),
			authorId: new UniqueEntityId("1"),
			...override,
		},
		id,
	);

	return question;
}
