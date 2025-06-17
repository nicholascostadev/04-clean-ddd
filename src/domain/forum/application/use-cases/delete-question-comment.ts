import { type Either, left, right } from "@/core/either";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { NotAllowedException } from "./exceptions/not-allowed-error";
import { ResourceNotFoundException } from "./exceptions/resource-not-found-exception";

interface DeleteQuestionCommentUseCaseRequest {
	authorId: string;
	questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<
	ResourceNotFoundException | NotAllowedException,
	void
>;

export class DeleteQuestionCommentUseCase {
	constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

	async execute({
		authorId,
		questionCommentId,
	}: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
		const questionComment =
			await this.questionCommentsRepository.findById(questionCommentId);

		if (!questionComment) {
			return left(new ResourceNotFoundException());
		}

		if (questionComment.authorId.toString() !== authorId) {
			return left(new NotAllowedException());
		}

		await this.questionCommentsRepository.delete(questionComment);

		return right(undefined);
	}
}
