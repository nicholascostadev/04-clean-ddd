import { type Either, left, right } from "@/core/either";
import type { AnswersRepository } from "../repositories/answers-repsitory";
import { NotAllowedException } from "./exceptions/not-allowed-error";
import { ResourceNotFoundException } from "./exceptions/resource-not-found-exception";

interface DeleteAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<
	ResourceNotFoundException | NotAllowedException,
	void
>;

export class DeleteAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		authorId,
		answerId,
	}: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundException());
		}

		if (authorId !== answer.authorId.toString()) {
			return left(new NotAllowedException());
		}

		await this.answersRepository.delete(answer);

		return right(undefined);
	}
}
