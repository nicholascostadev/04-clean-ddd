import type { AnswersRepository } from "../repositories/answers-repsitory";

interface DeleteAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
}

export class DeleteAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		authorId,
		answerId,
	}: DeleteAnswerUseCaseRequest): Promise<void> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			throw new Error("Answer not found");
		}

		if (authorId !== answer.authorId.toString()) {
			throw new Error("Not allowed");
		}

		await this.answersRepository.delete(answer);
	}
}
