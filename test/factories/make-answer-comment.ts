import { faker } from "@faker-js/faker";

import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
	AnswerComment,
	type AnswerCommentProps,
} from "@/domain/forum/enterprise/entities/answer-comment";

export function makeAnswerComment(
	override?: Partial<AnswerCommentProps>,
	id?: UniqueEntityId,
) {
	const answerComment = AnswerComment.create(
		{
			content: faker.lorem.text(),
			authorId: new UniqueEntityId(),
			answerId: new UniqueEntityId(),
			...override,
		},
		id,
	);

	return answerComment;
}
