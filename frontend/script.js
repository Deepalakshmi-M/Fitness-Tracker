var app = angular.module('fitnessApp', []);

app.controller('FitnessController', function ($scope, $http) {
    $scope.steps = 0;
    $scope.waterIntake = 0;
    $scope.calories = 0;
    $scope.history = JSON.parse(localStorage.getItem('fitnessHistory')) || [];
    $scope.leaderboard = [
        { name: 'John', steps: 12000 },
        { name: 'Emma', steps: 10000 },
        { name: 'Alex', steps: 8500 }
    ];

    // Fetch Weather Data & Suggest Workouts
    $scope.getWeather = function () {
        $http.get('http://localhost:3000/weather?city=' + $scope.city)
            .then(function (response) {
                $scope.weather = response.data;
                $scope.workoutSuggestion = suggestWorkout(response.data.temp);
            }, function (error) {
                console.log('Error fetching weather data', error);
            });
    };

    function suggestWorkout(temp) {
        if (temp > 30) return 'Indoor Yoga 🧘‍♂️';
        if (temp > 20) return 'Outdoor Running 🏃‍♀️';
        return 'Home Workout 💪';
    }

    // Save Steps
    $scope.saveSteps = function () {
        updateHistory();
    };

    // Add Water Intake
    $scope.addWater = function () {
        $scope.waterIntake += 0.25;
        updateHistory();
    };

    // Save Calories
    $scope.saveCalories = function () {
        updateHistory();
    };

    // Update Fitness History
    function updateHistory() {
        var today = new Date().toLocaleDateString();
        var existingEntry = $scope.history.find(entry => entry.date === today);

        if (existingEntry) {
            existingEntry.steps = $scope.steps;
            existingEntry.water = $scope.waterIntake;
            existingEntry.calories = $scope.calories;
        } else {
            $scope.history.push({
                date: today,
                steps: $scope.steps,
                water: $scope.waterIntake,
                calories: $scope.calories
            });
        }

        localStorage.setItem('fitnessHistory', JSON.stringify($scope.history));
    }
});
