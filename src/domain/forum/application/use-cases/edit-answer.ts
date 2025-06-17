import { type Either, left, right } from "@/core/either";
import type { Answer } from "../../enterprise/entities/answer";
import type { AnswersRepository } from "../repositories/answers-repsitory";
import { NotAllowedException } from "./exceptions/not-allowed-error";
import { ResourceNotFoundException } from "./exceptions/resource-not-found-exception";

interface EditAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

type EditAnswerUseCaseResponse = Either<
	ResourceNotFoundException | NotAllowedException,
	{
		answer: Answer;
	}
>;

export class EditAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		authorId,
		answerId,
		content,
	}: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundException());
		}

		if (authorId !== answer.authorId.toString()) {
			return left(new NotAllowedException());
		}

		answer.content = content;

		await this.answersRepository.save(answer);

		return right({
			answer,
		});
	}
}
