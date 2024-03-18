import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-type";

export interface CourseState extends EntityState<Course>{
    // adding this flag to check if the courses are already present in the store
    allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    // if say id is named as course id or something we have to use the below code as well
    // selectId: course => course.id
});

export const initialCourseState = adapter.getInitialState();

export const coursesReducer = createReducer(
    initialCourseState,

    on(CourseActions.allCoursesLoaded, 
        (state, action) => adapter.setAll(action.courses, {...state, allCoursesLoaded:true})),

    
    on(CourseActions.courseUpdated,
        (state, action) => adapter.updateOne(action.update, state)
        )
);

export const {selectAll} = adapter.getSelectors();