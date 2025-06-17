import { type Either, left, right } from "@/core/either";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundException } from "./exceptions/resource-not-found-exception";

type GetQuestionBySlugUseCaseRequest = {
	slug: string;
};

type GetQuestionBySlugUseCaseResponse = Either<
	ResourceNotFoundException,
	{
		question: Question;
	}
>;

export class GetQuestionBySlugUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		slug,
	}: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
		const question = await this.questionsRepository.findBySlug(slug);

		if (!question) {
			return left(new ResourceNotFoundException());
		}

		return right({
			question,
		});
	}
}
