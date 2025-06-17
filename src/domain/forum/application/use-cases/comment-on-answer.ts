import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import type { AnswersRepository } from "../repositories/answers-repsitory";

interface CommentOnAnswerCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

interface CommentOnAnswerCaseResponse {
	answerComment: AnswerComment;
}

export class CommentOnAnswerCase {
	constructor(
		private answersRepository: AnswersRepository,
		private answerCommentsRepository: AnswerCommentsRepository,
	) {}

	async execute({
		authorId,
		answerId,
		content,
	}: CommentOnAnswerCaseRequest): Promise<CommentOnAnswerCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			throw new Error("Answer not found");
		}

		const answerComment = AnswerComment.create({
			authorId: new UniqueEntityId(authorId),
			answerId: new UniqueEntityId(answerId),
			content,
		});

		await this.answerCommentsRepository.create(answerComment);

		return {
			answerComment,
		};
	}
}
